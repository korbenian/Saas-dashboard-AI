'use client'

import { useEffect, useState } from 'react'
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../../../lib/firebase'
import { getRandomProgress } from '../../utils/utils'

export interface Project {
  name: string
  desc: string
  dataStart: string
  dataEnd: string
  index: string
  createdAt: string
  tasks: {
    title: string
    isDone: boolean
  }[]
  progress: number
}

interface ProjectData {
  projects: Project[]
  removeTask: (id: string) => Promise<void>
  isLoading: boolean
  error: string | null
}

export function useProject (email: string): ProjectData {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const q = query(
        collection(db, 'projects'),
        where('userEmail', '==', email)
      )
      const snapshot = await getDocs(q)
      const data = snapshot.docs.map(docSnap => {
        const raw = docSnap.data()
        return {
          ...raw,
          index: docSnap.id,
          progress: getRandomProgress(),
          tasks: raw.tasks || []
        } as Project
      })
      setProjects(data)
    } catch (err) {
      setError('Ошибка загрузки проектов')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (email) fetchProjects()
  }, [email])

  const removeTask = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'projects', id))
      setProjects(prev => prev.filter(p => p.index !== id))
    } catch (err) {
      console.error('Ошибка удаления задачи:', err)
    }
  }

  return {
    projects,
    removeTask,
    isLoading,
    error
  }
}
