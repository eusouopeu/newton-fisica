import {
  ArrowTrendingUpIcon,
  ArrowsPointingOutIcon,
  HandRaisedIcon,
  PresentationChartLineIcon,
  RocketLaunchIcon,
  ScaleIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/solid'
import type { ComponentType, SVGProps } from 'react'

const ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  'chart-line': PresentationChartLineIcon,
  'arrow-trending-up': ArrowTrendingUpIcon,
  'rocket-launch': RocketLaunchIcon,
  scale: ScaleIcon,
  'arrows-pointing-out': ArrowsPointingOutIcon,
  triangle: Squares2X2Icon,
  'hand-raised': HandRaisedIcon,
}

export default function TopicIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = ICONS[icon] ?? Squares2X2Icon
  return <Icon className={className} />
}
