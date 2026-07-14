<template>
  <el-main class="api-doc">
    <div class="doc-header">
      <div>
        <h2 style="margin:0">{{ info.title || '接口文档' }}</h2>
        <p style="color:#909399;margin:4px 0 0;font-size:13px">{{ info.description }} <el-tag size="small" type="info">v{{ info.version }}</el-tag></p>
      </div>
      <el-input v-model="keyword" placeholder="搜索接口路径 / 描述" clearable style="width:280px" :prefix-icon="Search" />
    </div>

    <div v-loading="loading">
      <div v-for="group in filteredGroups" :key="group.name" class="api-group">
        <div class="group-title">
          <el-icon><Folder /></el-icon>
          <span>{{ group.name }}</span>
          <el-tag size="small" type="info" effect="plain">{{ group.apis.length }} 个接口</el-tag>
        </div>

        <el-collapse>
          <el-collapse-item v-for="(api, i) in group.apis" :key="i">
            <template #title>
              <div class="api-row">
                <el-tag :type="methodType(api.method)" effect="dark" size="small" class="method-tag">{{ api.method.toUpperCase() }}</el-tag>
                <span class="api-path">{{ api.path }}</span>
                <span class="api-summary">{{ api.summary }}</span>
              </div>
            </template>

            <div class="api-detail">
              <!-- 请求参数 -->
              <div class="detail-section">
                <h4>请求参数</h4>
                <el-table v-if="api.params.length" :data="api.params" size="small" border>
                  <el-table-column prop="name" label="参数名" width="180" />
                  <el-table-column prop="in" label="位置" width="100" />
                  <el-table-column prop="type" label="类型" width="120" />
                  <el-table-column label="必填" width="80" align="center">
                    <template #default="s">
                      <el-tag :type="s.row.required?'danger':'info'" size="small">{{ s.row.required ? '是' : '否' }}</el-tag>
                    </template>
                  </el-table-column>
                  <el-table-column prop="description" label="说明" />
                </el-table>
                <el-empty v-else description="无请求参数" :image-size="60" />
              </div>

              <!-- 请求体 -->
              <div v-if="api.requestBody" class="detail-section">
                <h4>请求体 (Request Body)</h4>
                <pre class="code-block">{{ api.requestBody }}</pre>
              </div>

              <!-- 响应 -->
              <div class="detail-section">
                <h4>响应示例</h4>
                <pre class="code-block">{{ api.response }}</pre>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <el-empty v-if="!loading && !filteredGroups.length" description="未找到匹配的接口" />
    </div>
  </el-main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, Folder } from '@element-plus/icons-vue'
import axios from 'axios'

interface ApiItem {
  path: string
  method: string
  summary: string
  tag: string
  params: any[]
  requestBody: string
  response: string
}

const loading = ref(true)
const keyword = ref('')
const info = ref<any>({})
const apis = ref<ApiItem[]>([])

const methodType = (m: string) => {
  const map: Record<string, string> = { get: 'success', post: 'warning', put: 'primary', delete: 'danger' }
  return map[m.toLowerCase()] || 'info'
}

// 按 tag 分组
const groups = computed(() => {
  const map: Record<string, ApiItem[]> = {}
  apis.value.forEach(a => {
    const g = a.tag || '其他'
    if (!map[g]) map[g] = []
    map[g].push(a)
  })
  return Object.keys(map).map(name => ({ name, apis: map[name] }))
})

const filteredGroups = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  if (!kw) return groups.value
  return groups.value
    .map(g => ({ name: g.name, apis: g.apis.filter(a =>
      a.path.toLowerCase().includes(kw) || (a.summary || '').toLowerCase().includes(kw)) }))
    .filter(g => g.apis.length)
})

const base = import.meta.env.VITE_API_BASE || 'http://localhost:8090/'

const loadDocs = async () => {
  loading.value = true
  try {
    const { data } = await axios.get(base.replace(/\/$/, '') + '/v3/api-docs')
    info.value = data.info || {}
    // tag 名映射
    const tagMap: Record<string, string> = {}
    ;(data.tags || []).forEach((t: any) => { tagMap[t.name] = t.name })

    const list: ApiItem[] = []
    Object.keys(data.paths || {}).forEach(path => {
      const methods = data.paths[path]
      Object.keys(methods).forEach(method => {
        const op = methods[method]
        // 参数
        const params = (op.parameters || []).map((p: any) => ({
          name: p.name,
          in: p.in,
          type: p.schema?.type || p.schema?.$ref?.split('/').pop() || 'object',
          required: !!p.required,
          description: p.description || ''
        }))
        // 请求体
        let requestBody = ''
        if (op.requestBody) {
          const content = op.requestBody.content
          const json = content?.['application/json']
          if (json?.schema) {
            requestBody = JSON.stringify(resolveSchema(json.schema, data), null, 2)
          }
        }
        // 响应
        let response = ''
        const resp200 = op.responses?.['200']
        if (resp200?.content?.['*/*']?.schema || resp200?.content?.['application/json']?.schema) {
          const sc = resp200.content['*/*']?.schema || resp200.content['application/json'].schema
          response = JSON.stringify(resolveSchema(sc, data), null, 2)
        } else {
          response = '{\n  "code": 200,\n  "msg": "操作成功",\n  "data": {}\n}'
        }
        list.push({
          path, method,
          summary: op.summary || op.operationId || '',
          tag: (op.tags && op.tags[0]) || '其他',
          params, requestBody, response
        })
      })
    })
    apis.value = list
  } catch (e) {
    // 后端不可达
  } finally {
    loading.value = false
  }
}

// 简单解析 schema $ref，生成示例结构
function resolveSchema(schema: any, doc: any, depth = 0): any {
  if (depth > 4 || !schema) return {}
  if (schema.$ref) {
    const name = schema.$ref.split('/').pop()
    const def = doc.components?.schemas?.[name]
    return def ? resolveSchema(def, doc, depth + 1) : {}
  }
  if (schema.type === 'array') {
    return [resolveSchema(schema.items, doc, depth + 1)]
  }
  if (schema.type === 'object' || schema.properties) {
    const obj: any = {}
    Object.keys(schema.properties || {}).forEach(k => {
      obj[k] = resolveSchema(schema.properties[k], doc, depth + 1)
    })
    return obj
  }
  // 基本类型示例值
  const samples: Record<string, any> = {
    string: 'string', integer: 0, number: 0, boolean: true
  }
  return samples[schema.type] ?? null
}

onMounted(loadDocs)
</script>

<style scoped lang="scss">
.api-doc {
  background: #fff;
}
.doc-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}
.api-group {
  margin-bottom: 24px;
}
.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 8px;
  padding: 8px 0;
}
.api-row {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
}
.method-tag {
  width: 60px;
  text-align: center;
  font-weight: bold;
}
.api-path {
  font-family: 'Menlo', monospace;
  color: #303133;
  font-size: 13px;
}
.api-summary {
  color: #909399;
  font-size: 13px;
  margin-left: auto;
  padding-right: 12px;
}
.api-detail {
  padding: 12px 8px;
}
.detail-section {
  margin-bottom: 16px;
  h4 {
    margin: 0 0 8px;
    color: #606266;
    font-size: 14px;
  }
}
.code-block {
  background: #282c34;
  color: #abb2bf;
  padding: 12px 16px;
  border-radius: 6px;
  font-family: 'Menlo', monospace;
  font-size: 12px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}
</style>
