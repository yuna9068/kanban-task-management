export type Operation = 'create' | 'edit'
export type FormItemType = 'single' | 'column' | 'textarea' | 'select' | 'subtask' | 'checkbox'
export type ValidateType = 'board' | 'column' | 'task' | 'subtask'

export interface ValidateResult {
  status: boolean
  msg: string
}

export interface Subtask {
  title: string
  isCompleted: boolean
}

export interface Task {
  title: string
  description: string
  status: string
  subtasks: Subtask[]
}

export interface Column {
  name: string
  tasks: Task[]
}

export interface Board {
  name: string
  columns: Column[]
}
