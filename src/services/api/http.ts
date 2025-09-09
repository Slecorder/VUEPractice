const BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

function buildUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) return path
  if (!BASE_URL) return path
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`
}

export async function http<T>(
  path: string,
  options: RequestInit & { json?: unknown } = {}
): Promise<T> {
  const { json, headers, ...rest } = options
  const finalHeaders: Record<string, string> = {
    ...(headers as Record<string, string>),
  }

  let body: BodyInit | undefined = rest.body as BodyInit
  if (json !== undefined) {
    body = JSON.stringify(json)
    finalHeaders['Content-Type'] = finalHeaders['Content-Type'] || 'application/json'
  }

  const res = await fetch(buildUrl(path), {
    method: rest.method || (json !== undefined ? 'POST' : 'GET'),
    ...rest,
    headers: finalHeaders,
    body,
  })

  const text = await res.text()
  const maybeJson = (() => {
    try {
      return text ? JSON.parse(text) : null
    } catch {
      return null
    }
  })()

  if (!res.ok) {
    const message = (maybeJson && (maybeJson.message || maybeJson.error)) || res.statusText
    throw new Error(message)
  }

  // If response body is empty, return undefined cast to T to satisfy the generic contract
  return ((maybeJson as unknown) ?? (undefined as unknown)) as T
}

export function get<T>(path: string, init?: RequestInit) {
  return http<T>(path, { ...init, method: 'GET' })
}

export function post<T>(path: string, json?: unknown, init?: RequestInit) {
  return http<T>(path, { ...init, method: 'POST', json })
}

export function del<T>(path: string, init?: RequestInit) {
  return http<T>(path, { ...init, method: 'DELETE' })
}

export function put<T>(path: string, json?: unknown, init?: RequestInit) {
  return http<T>(path, { ...init, method: 'PUT', json })
}

export const API_BASE_URL = BASE_URL
