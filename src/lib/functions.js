import { invoke } from '@tauri-apps/api/core'

/**
 * 安全执行Rust命令，统一处理错误
 * @param {string} command - 要执行的命令
 * @param {object} args - 命令参数
 * @returns {Promise<any>} 命令结果
 */
export async function invokeCommand(command, args = {}) {
  try {
    return await invoke(command, args)
  } catch (error) {
    console.error(`Failed to execute command ${command}:`, error)
    throw error
  }
}

/**
 * 格式化日期时间
 * @param {Date|string|number} date - 要格式化的日期
 * @param {string} format - 格式字符串
 * @returns {string} 格式化后的日期字符串
 */
export function formatDate(date, format = 'YYYY-MM-DD') {
  const d = new Date(date)
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  
  return format
    .replace('YYYY', year)
    .replace('MM', month)
    .replace('DD', day)
}
