// Auto-initialize all interactive components on every page
import { initTutorChat } from './tutor-chat.js';
import { initExplainButtons } from './explain-code.js';
import { initSectionNav } from './section-nav.js';
import { initAudioReader } from './audio-reader.js';
import { initPodcastPlayer } from './podcast-player.js';
import { initXPTracker } from './xp-tracker.js';
import { initSkillTest } from './skill-test.js';

initTutorChat();
initExplainButtons();
initSectionNav();
initAudioReader();
initPodcastPlayer();
initXPTracker();
initSkillTest();
