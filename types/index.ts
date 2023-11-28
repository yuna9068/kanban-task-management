export type Operation = 'create' | 'edit'
export type AlertType = 'board' | 'task'

interface Subtask {
  title: string
  isCompleted: boolean
}

interface Task {
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
