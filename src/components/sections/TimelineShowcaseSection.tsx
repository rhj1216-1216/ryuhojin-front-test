import type { RoadmapGroup, RoadmapItem } from '../../types/dashboard';
import { RoadmapTimeline } from '../../features/timeline/RoadmapTimeline';
import { Section } from '../ui/Section';

interface TimelineShowcaseSectionProps {
  section: {
    eyebrow: string;
    title: string;
    description: string;
  };
  timelineCopy: {
    editorLabel: string;
    editorTitle: string;
    editorDescription: string;
    visibleLabel: string;
    titleLabel: string;
    groupLabel: string;
    statusLabel: string;
    startLabel: string;
    endLabel: string;
    progressLabel: string;
    shellLabel: string;
    summary: (visibleCount: number, groupCount: number) => string;
    zoomControlsLabel: string;
    zoomInLabel: string;
    zoomOutLabel: string;
    resetLabel: string;
    sidebarLabel: string;
  };
  groups: RoadmapGroup[];
  items: RoadmapItem[];
}

export const TimelineShowcaseSection = ({
  section,
  timelineCopy,
  groups,
  items,
}: TimelineShowcaseSectionProps) => (
  <Section
    id="timeline"
    eyebrow={section.eyebrow}
    title={section.title}
    description={section.description}
  >
    <RoadmapTimeline groups={groups} items={items} copy={timelineCopy} />
  </Section>
);
