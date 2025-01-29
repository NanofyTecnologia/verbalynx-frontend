import {
  Users,
  NotebookPen,
  PanelsTopLeft,
  GraduationCap,
  HeartHandshake,
} from 'lucide-react'

export const links = [
  {
    label: 'Início',
    icon: <PanelsTopLeft />,
    href: '/auth',
    roles: ['PROFESSOR', 'STUDENT'],
  },
  {
    label: 'Turmas',
    icon: <Users />,
    href: '/auth/turmas',
    roles: ['PROFESSOR'],
  },
  {
    label: 'Minha turma',
    icon: <Users />,
    href: '/auth/turmas',
    roles: ['STUDENT'],
  },
  {
    label: 'Atividades',
    icon: <NotebookPen />,
    href: '/auth/atividades',
    roles: ['PROFESSOR', 'STUDENT'],
  },
  {
    label: 'Estudantes',
    icon: <GraduationCap />,
    href: '/auth/estudantes',
    roles: ['PROFESSOR'],
  },
  {
    label: 'Usuários',
    icon: <Users />,
    href: '/auth/usuarios',
    roles: ['ADMIN'],
  },
  {
    label: 'Ajuda',
    icon: <HeartHandshake />,
    href: '/auth/ajuda',
    roles: ['PROFESSOR', 'STUDENT', 'ADMIN'],
  },
]
