import { useState, useRef, useEffect } from 'react'
import './App.css'
import { database, storage } from './firebase'
import { ref, push, onValue, query, orderByChild, limitToLast, get, update, remove, set } from 'firebase/database'
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'

// Import new TikTok videos
import video1 from './assets/videos/1.mp4'
import video2 from './assets/videos/2.mp4'
import video3 from './assets/videos/3.mp4'
import video4 from './assets/videos/4.mp4'
import video5 from './assets/videos/5.mp4'
import video6 from './assets/videos/6.mp4'
import video7 from './assets/videos/7.mp4'
import video8 from './assets/videos/8.mp4'
import video9 from './assets/videos/9.mp4'
import video10 from './assets/videos/10.mp4'
import video11 from './assets/videos/11.mp4'
import video12 from './assets/videos/12.mp4'
import video13 from './assets/videos/13.mp4'
import video14 from './assets/videos/14.mp4'
import video15 from './assets/videos/15.mp4'
import video16 from './assets/videos/16.mp4'
import video17 from './assets/videos/17.mp4'
import video18 from './assets/videos/18.mp4'
import video19 from './assets/videos/19.mp4'
import video20 from './assets/videos/20.mp4'
import video21 from './assets/videos/21.mp4'
import video22 from './assets/videos/22.mp4'
import video23 from './assets/videos/23.mp4'
import video24 from './assets/videos/24.mp4'
import video25 from './assets/videos/25.mp4'
import video26 from './assets/videos/26.mp4'
import video27 from './assets/videos/27.mp4'
import video28 from './assets/videos/28.mp4'
import video29 from './assets/videos/29.mp4'
import video30 from './assets/videos/30.mp4'
import video31 from './assets/videos/31.mp4'

// Array of all available videos
const availableVideos = [
  video1, video2, video3, video4, video5, video6, video7, video8, video9, video10,
  video11, video12, video13, video14, video15, video16, video17, video18, video19, video20,
  video21, video22, video23, video24, video25, video26, video27, video28, video29, video30, video31
]

// Function to create a shuffled array of videos that ensures all videos play once before any repeats
// The order is randomized on each user load, but no video appears twice until all videos have been shown
function createShuffledVideoArray(videoCount: number): string[] {
  // First, shuffle all available videos to randomize the order on user load
  const shuffledAllVideos = shuffleArray([...availableVideos])
  
  // Calculate how many full cycles we need
  const cycles = Math.ceil(videoCount / shuffledAllVideos.length)
  
  // Create array with shuffled videos repeated enough times
  const repeatedVideos: string[] = []
  for (let i = 0; i < cycles; i++) {
    // First cycle uses the shuffled array, subsequent cycles shuffle again for variety
    if (i === 0) {
      repeatedVideos.push(...shuffledAllVideos)
    } else {
      // After all videos have been shown once, shuffle again for the next cycle
      repeatedVideos.push(...shuffleArray([...availableVideos]))
    }
  }
  
  // Take only the number we need
  const videosToUse = repeatedVideos.slice(0, videoCount)
  
  return videosToUse
}

// Import app icons
import pumpfunIcon from './assets/iphone icons/pumpfun.png'
import tiktokIcon from './assets/iphone icons/tiktok.png'
import xIcon from './assets/iphone icons/x.png'
import messagesIcon from './assets/iphone icons/messages.png'

// Import TikTok action icons
import commentsIcon from './assets/tiktok icons/comments.svg'

// Import status bar icons
import cellularIcon from './assets/iphone icons/🧩 Status Bar › Cellular Icon.svg'
import wifiIcon from './assets/iphone icons/🧩 Status Bar › Wi-Fi Icon.svg'
import batteryIcon from './assets/iphone icons/🧩 Status Bar › Battery Icon.svg'

// Import preloader logo
import preloaderLogo from './assets/preloader/text white.png'

// Import profile pictures
import profile1 from './assets/profile pictures/06f0b02f4838a79ac9f58e5a0eaeb325.jpg'
import profile2 from './assets/profile pictures/0737d3e94b1859ac0d1ad785cf052e63.jpg'
import profile3 from './assets/profile pictures/1275afea85213b579fae7f22243edfd0.jpg'
import profile4 from './assets/profile pictures/1f0a2813877c65540f0cfe8e9687b2c8.jpg'
import profile5 from './assets/profile pictures/2401a9479bec9d8c575b38623160e1ef8bcf9105r1-736-735v2_hq.jpg'
import profile6 from './assets/profile pictures/2658-aesthetic-meme.png'
import profile7 from './assets/profile pictures/2eb8a0fa6240e6bd4a09ca6f2b3ebb25.jpg'
import profile8 from './assets/profile pictures/37a8ea80a2ecbf7c5ecff296b8b7a605.jpg'
import profile9 from './assets/profile pictures/7382b2e8e8c7be98240ef28a2506800e.jpg'
import profile10 from './assets/profile pictures/774e4b14693723862753a56aad66a3fb.jpg'
import profile11 from './assets/profile pictures/a035f92eadd9453ed5a802427fef6a2e.jpg'
import profile12 from './assets/profile pictures/a9d6431343baffcf254ac58b262fe7d2.jpg'
import profile13 from './assets/profile pictures/anime-pfp-sad-boy-40s0vjfpa8vt3ou3.jpg'
import profile14 from './assets/profile pictures/c1bb48f37654992b02b563dd2b15db23.jpg'
import profile15 from './assets/profile pictures/c947ac5849abaf57398cf7c5c87a753b.jpg'
import profile16 from './assets/profile pictures/cb04e0cbcf80112be43ce0cdf92eab63.jpg'
import profile17 from './assets/profile pictures/ccc800669c4c22d6e5f9f0b2adb75256.jpg'
import profile18 from './assets/profile pictures/f8a0f48239a5cf91bf58be436519f82e.jpg'
import profile19 from './assets/profile pictures/fb9ad76aaa7e798f81215fe272437da7.jpg'
import profile20 from './assets/profile pictures/images (14).jpg'
import profile21 from './assets/profile pictures/images (15).jpg'
import profile22 from './assets/profile pictures/images (16).jpg'
import profile23 from './assets/profile pictures/images (17).jpg'
import profile24 from './assets/profile pictures/images (18).jpg'
import profile25 from './assets/profile pictures/images (19).jpg'
import profile26 from './assets/profile pictures/images (20).jpg'
import profile27 from './assets/profile pictures/images (22).jpg'
import profile28 from './assets/profile pictures/images (23).jpg'
import profile29 from './assets/profile pictures/images (24).jpg'
import profile30 from './assets/profile pictures/images (25).jpg'
import profile31 from './assets/profile pictures/images (26).jpg'
import profile32 from './assets/profile pictures/images (27).jpg'
import profile33 from './assets/profile pictures/IMG_7617.jpg'

interface VideoItem {
  id: number
  username: string
  caption: string
  videoUrl: string
  imageUrl?: string // For placeholder images
  avatarUrl: string
  likes: number
  comments: number
  bookmarks: number
  shares: number
}

interface Comment {
  id: number
  firebaseId: string
  username: string
  avatar: string
  text: string
  likes: number
  timestamp: Date
  parentId?: string
  replies?: Comment[]
}

// Helper function to format numbers (1900000 -> 1.9M)
const formatCount = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M'
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K'
  }
  return num.toString()
}


// Format time ago
const formatTimeAgo = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000)
  
  if (seconds < 60) return 'just now'
  
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  
  const days = Math.floor(hours / 24)
  if (days < 7) return `${days}d ago`
  
  const weeks = Math.floor(days / 7)
  return `${weeks}w ago`
}

// Get all available profile pictures
const getAllProfilePictures = () => {
  return [profile1, profile2, profile3, profile4, profile5, profile6, profile7, profile8, profile9, profile10, profile11, profile12, profile13, profile14, profile15, profile16, profile17, profile18, profile19, profile20, profile21, profile22, profile23, profile24, profile25, profile26, profile27, profile28, profile29, profile30, profile31, profile32, profile33]
}

// Shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}


function App() {
  const [videos] = useState<VideoItem[]>(() => {
    // Captions mapped to video file numbers (1-31)
    const captionsByVideoNumber: { [key: number]: string } = {
      1: 'type yes to affirm',
      2: '67 💀',
      3: 'Yakub NEEDS you to clutch the 1v4',
      4: '💀😭',
      5: 'activating baby oil retrieval protocol',
      6: 'he fr hittin all the notes 😭',
      7: 'supply drop got me bricked up',
      8: '💀💀💀💀',
      9: 'im picking up fr',
      10: 'genuinely 😭🥀',
      11: 'yaaaaas diva',
      12: 'IM NEVER PAYIN MY TAXES',
      13: '#WEARECHARLIEKIRK',
      14: 'UHHHHHHHHHHHHHHHHHHH',
      15: 'UHHHHHHHH 😭',
      16: 'blueberry gaygo',
      17: 'fuck u nigga',
      18: 'Unc is bamboozled 😭🥀💀',
      19: 'we can go rizz for rizz',
      20: '67 🤣🤣🤣',
      21: 'ling dong goonie goonie goo',
      22: '#beandiesel',
      23: 'bro got that dawg in him',
      24: 'wobbly wiggly',
      25: '💀💀😭',
      26: 'real',
      27: 'bro doesent know bron 😭',
      28: '😭',
      29: 'type yes to affirm',
      30: 'congratulations you are getting deported',
      31: 'ching chong ping pong'
    }
    
    // Create shuffled video array (no duplicates until all videos are shown)
    const shuffledVideoUrls = createShuffledVideoArray(33)
    
    // Function to get video number from video URL by finding its index in availableVideos
    const getVideoNumber = (videoUrl: string): number => {
      const index = availableVideos.indexOf(videoUrl)
      return index + 1 // video1 = 1, video2 = 2, etc.
    }
    
    // Create initial video array with shuffled videos, matching captions to file numbers
    const initialVideos = [
      { id: 1, username: '@rizzgoblin', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[0])] || '', videoUrl: shuffledVideoUrls[0], avatarUrl: profile1, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 2, username: '@gyattywarlock', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[1])] || '', videoUrl: shuffledVideoUrls[1], avatarUrl: profile2, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 3, username: '@zynmage420', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[2])] || '', videoUrl: shuffledVideoUrls[2], avatarUrl: profile3, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 4, username: '@fanumfiend', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[3])] || '', videoUrl: shuffledVideoUrls[3], avatarUrl: profile4, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 5, username: '@ohioOverseer', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[4])] || '', videoUrl: shuffledVideoUrls[4], avatarUrl: profile5, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 6, username: '@rotlord.exe', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[5])] || '', videoUrl: shuffledVideoUrls[5], avatarUrl: profile6, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 7, username: '@goblincig69', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[6])] || '', videoUrl: shuffledVideoUrls[6], avatarUrl: profile7, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 8, username: '@zootedhamster', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[7])] || '', videoUrl: shuffledVideoUrls[7], avatarUrl: profile8, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 9, username: '@hamsterhooligan', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[8])] || '', videoUrl: shuffledVideoUrls[8], avatarUrl: profile9, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 10, username: '@skibidipriest', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[9])] || '', videoUrl: shuffledVideoUrls[9], avatarUrl: profile10, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 11, username: '@npcprophet', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[10])] || '', videoUrl: shuffledVideoUrls[10], avatarUrl: profile11, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 12, username: '@munchmessiah', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[11])] || '', videoUrl: shuffledVideoUrls[11], avatarUrl: profile12, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 13, username: '@sigmafreakazoid', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[12])] || '', videoUrl: shuffledVideoUrls[12], avatarUrl: profile13, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 14, username: '@jitteryjunkie', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[13])] || '', videoUrl: shuffledVideoUrls[13], avatarUrl: profile14, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 15, username: '@midbossmoment', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[14])] || '', videoUrl: shuffledVideoUrls[14], avatarUrl: profile15, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 16, username: '@motherlesspookie', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[15])] || '', videoUrl: shuffledVideoUrls[15], avatarUrl: profile16, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 17, username: '@degensummoner', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[16])] || '', videoUrl: shuffledVideoUrls[16], avatarUrl: profile17, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 18, username: '@capybaraCartel', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[17])] || '', videoUrl: shuffledVideoUrls[17], avatarUrl: profile18, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 19, username: '@ragepixie', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[18])] || '', videoUrl: shuffledVideoUrls[18], avatarUrl: profile19, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 20, username: '@sillygoathazard', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[19])] || '', videoUrl: shuffledVideoUrls[19], avatarUrl: profile20, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 21, username: '@lightSkinOverload', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[20])] || '', videoUrl: shuffledVideoUrls[20], avatarUrl: profile21, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 22, username: '@gyattynation', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[21])] || '', videoUrl: shuffledVideoUrls[21], avatarUrl: profile22, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 23, username: '@rizzreceptacle', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[22])] || '', videoUrl: shuffledVideoUrls[22], avatarUrl: profile23, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 24, username: '@creeprizzlord', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[23])] || '', videoUrl: shuffledVideoUrls[23], avatarUrl: profile24, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 25, username: '@mommygyattmilk', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[24])] || '', videoUrl: shuffledVideoUrls[24], avatarUrl: profile25, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 26, username: '@doubletapdaemon', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[25])] || '', videoUrl: shuffledVideoUrls[25], avatarUrl: profile26, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 27, username: '@delusionalnpc', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[26])] || '', videoUrl: shuffledVideoUrls[26], avatarUrl: profile27, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 28, username: '@rottingwithrizz', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[27])] || '', videoUrl: shuffledVideoUrls[27], avatarUrl: profile28, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 29, username: '@rizzeduprodent', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[28])] || '', videoUrl: shuffledVideoUrls[28], avatarUrl: profile29, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 30, username: '@ohioMFSupreme', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[29])] || '', videoUrl: shuffledVideoUrls[29], avatarUrl: profile30, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 31, username: '@doomscrollDruid', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[30])] || '', videoUrl: shuffledVideoUrls[30], avatarUrl: profile31, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 32, username: '@brainrotBandit', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[31])] || '', videoUrl: shuffledVideoUrls[31], avatarUrl: profile32, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
      { id: 33, username: '@mrmelatonin2mg', caption: captionsByVideoNumber[getVideoNumber(shuffledVideoUrls[32])] || '', videoUrl: shuffledVideoUrls[32], avatarUrl: profile33, likes: 0, comments: 0, bookmarks: 0, shares: 0 },
    ]
    return initialVideos
  })

  // Create circular buffer by adding duplicates at boundaries
  const circularVideos = [
    videos[videos.length - 1], // Last video at start (for wrap-up)
    ...videos,
    videos[0] // First video at end (for wrap-down)
  ]
  
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(1) // Start at first real video (index 1 because of duplicate)
  const [likedVideos, setLikedVideos] = useState<Set<number>>(new Set())
  const [bookmarkedVideos, setBookmarkedVideos] = useState<Set<number>>(new Set())
  const [videoStats, setVideoStats] = useState<{ [videoId: number]: { likes: number; bookmarks: number; comments: number } }>({})
  const [pausedVideos, setPausedVideos] = useState<Set<number>>(new Set())
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set())
  const [glowColor, setGlowColor] = useState('100, 150, 255')
  const screenRef = useRef<HTMLDivElement>(null)
  const [showMessages, setShowMessages] = useState(false)
  const [messages, setMessages] = useState<Array<{ id: string; text: string; isUser: boolean; username: string; timestamp: Date; imageUrl?: string }>>([])
  const [messageInput, setMessageInput] = useState('')
  const [uploadingImage, setUploadingImage] = useState(false)
  const [showUsernameSetup, setShowUsernameSetup] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasInteracted, setHasInteracted] = useState(false)
  const [showComments, setShowComments] = useState(false)
  const [currentVideoComments, setCurrentVideoComments] = useState<number | null>(null)
  const [commentInput, setCommentInput] = useState('')
  const [likedComments, setLikedComments] = useState<Set<number>>(new Set())
  const [videoComments, setVideoComments] = useState<{ [videoId: number]: Comment[] }>({})
  const [replyingTo, setReplyingTo] = useState<{ firebaseId: string; username: string } | null>(null)
  const commentInputRef = useRef<HTMLInputElement>(null)

  // Check for username on first load
  useEffect(() => {
    const username = getUserName()
    if (!username) {
      setShowUsernameSetup(true)
    }

    // Hide loading screen after initial render - ensure content is ready
    // Wait a bit longer to ensure content is fully rendered and visible
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2500) // Show logo for 2.5s, then fade out

    return () => clearTimeout(timer)
  }, [])

  // Initialize scroll position to first real video (skip duplicate at index 0)
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    
    // Set initial scroll position to first real video (index 1)
    const videoHeight = container.clientHeight
    container.scrollTo({
      top: 1 * videoHeight,
      behavior: 'auto'
    })
  }, [])

  // Auto-play video when it comes into view
  useEffect(() => {
    const videoElements = document.querySelectorAll('.video-player')
    videoElements.forEach((video, index) => {
      // Skip if it's an image (img element)
      if (video.tagName === 'IMG') return
      
      const videoEl = video as HTMLVideoElement
      // Unmute after first interaction for audio, keep muted initially for autoplay
      const videoData = circularVideos[index]
      videoEl.muted = !hasInteracted || mutedVideos.has(videoData.id)
      if (index === currentVideoIndex) {
        // Only play if user hasn't manually paused this video
        if (!pausedVideos.has(videoData.id)) {
          if (videoEl.paused) {
            videoEl.currentTime = 0
            const playPromise = videoEl.play()
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay might be blocked, that's okay
              })
            }
          }
        } else {
          // User has manually paused, keep it paused
          videoEl.pause()
        }
      } else {
        videoEl.pause()
      }
    })
  }, [currentVideoIndex, hasInteracted, mutedVideos, circularVideos, pausedVideos])

  // Handle video state when switching between messages/comments and TikTok
  useEffect(() => {
    if (!showMessages && !showComments) {
      // Returning to TikTok - pause ALL videos first, then play current
      setTimeout(() => {
        const videoElements = document.querySelectorAll('.video-player')
        
        // First, pause and reset ALL videos (skip images)
        videoElements.forEach((video) => {
          if (video.tagName === 'IMG') return
          const videoEl = video as HTMLVideoElement
          videoEl.pause()
          videoEl.currentTime = 0
        })
        
        // Then play only the current video (if not manually paused and it's a video)
        const currentVideo = videoElements[currentVideoIndex]
        if (currentVideo && currentVideo.tagName === 'VIDEO') {
          const currentVideoData = circularVideos[currentVideoIndex]
          const videoEl = currentVideo as HTMLVideoElement
          videoEl.muted = !hasInteracted || mutedVideos.has(currentVideoData.id)
          videoEl.currentTime = 0
          
          // Only play if user hasn't manually paused this video
          if (!pausedVideos.has(currentVideoData.id)) {
            videoEl.play().catch(() => {
              // Autoplay might be blocked
            })
          }
        }
      }, 100)
    } else if (showMessages || showComments) {
      // Going to messages or comments - pause all videos (skip images)
      const videoElements = document.querySelectorAll('.video-player')
      videoElements.forEach((video) => {
        if (video.tagName === 'IMG') return
        const videoEl = video as HTMLVideoElement
        videoEl.pause()
      })
    }
  }, [showMessages, showComments, currentVideoIndex, hasInteracted])

  // Ensure first video loads and plays on mount (single clean attempt)
  useEffect(() => {
    const initFirstVideo = () => {
      const videoElements = document.querySelectorAll('.video-player')
      if (videoElements.length === 0) return

      const firstVideo = videoElements[0]
      // Skip if it's an image
      if (firstVideo.tagName === 'IMG') return
      
      const videoEl = firstVideo as HTMLVideoElement
      
      const attemptPlay = () => {
        videoEl.muted = true // Start muted for Chrome autoplay
        videoEl.currentTime = 0
        videoEl.play().catch(() => {
          // If autoplay fails, wait for user interaction
          const playOnInteract = () => {
            videoEl.play()
            setHasInteracted(true)
            document.removeEventListener('click', playOnInteract)
            document.removeEventListener('touchstart', playOnInteract)
          }
          document.addEventListener('click', playOnInteract, { once: true })
          document.addEventListener('touchstart', playOnInteract, { once: true })
        })
      }

      // Wait for video to be ready
      if (videoEl.readyState >= 3) {
        attemptPlay()
      } else {
        videoEl.addEventListener('canplay', attemptPlay, { once: true })
      }
    }

    setTimeout(initFirstVideo, 300)
  }, [])

  // Sample video colors for ambient glow with enhanced vibrancy
  useEffect(() => {
    // Don't sample video colors when showing messages
    if (showMessages) return
    
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return

    const sampleColors = () => {
      const videoElements = document.querySelectorAll('.video-player')
      // Use currentVideoIndex which now points to circular buffer
      const currentVideo = videoElements[currentVideoIndex]
      
      // Skip if it's an image or not a video element
      if (!currentVideo || currentVideo.tagName === 'IMG') return
      
      const videoEl = currentVideo as HTMLVideoElement
      if (videoEl.readyState < 2) return

      canvas.width = 80
      canvas.height = 80
      
      try {
        ctx.drawImage(videoEl, 0, 0, 80, 80)
        const imageData = ctx.getImageData(0, 0, 80, 80).data
        
        let r = 0, g = 0, b = 0, count = 0
        
        // Sample pixels, ignoring very dark ones to get more vibrant colors
        for (let i = 0; i < imageData.length; i += 4) {
          const red = imageData[i]
          const green = imageData[i + 1]
          const blue = imageData[i + 2]
          const brightness = (red + green + blue) / 3
          
          // Skip very dark pixels (black areas don't contribute to glow)
          if (brightness > 30) {
            r += red
            g += green
            b += blue
            count++
          }
        }
        
        if (count > 0) {
          r = Math.floor(r / count)
          g = Math.floor(g / count)
          b = Math.floor(b / count)
          
          // Boost saturation for more vibrant glow
          const max = Math.max(r, g, b)
          const min = Math.min(r, g, b)
          const saturation = max === 0 ? 0 : (max - min) / max
          
          if (saturation > 0.1) {
            // Amplify the dominant color
            const boost = 1.4
            r = Math.min(255, Math.floor(r * boost))
            g = Math.min(255, Math.floor(g * boost))
            b = Math.min(255, Math.floor(b * boost))
          }
          
          setGlowColor(`${r}, ${g}, ${b}`)
        }
      } catch (e) {
        // CORS or other error, keep default
      }
    }

    const interval = setInterval(sampleColors, 50) // More frequent updates
    return () => clearInterval(interval)
  }, [currentVideoIndex, showMessages])
  
  // Update glow color for messages screen
  useEffect(() => {
    if (showMessages) {
      // Set blue glow for messages screen
      setGlowColor('30, 100, 200')
    }
    // When returning to TikTok, the video color sampling will take over
  }, [showMessages])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let animationFrameId: number

    // Track which video is in view and update opacity
    const updateCurrentVideo = () => {
      const scrollTop = container.scrollTop
      const videoHeight = container.clientHeight
      let index = Math.round(scrollTop / videoHeight)
      
      // Clamp index to circular buffer range
      index = Math.max(0, Math.min(index, circularVideos.length - 1))
      
      // Seamless wrap when snapped to duplicate videos
      const isSnapped = Math.abs(scrollTop - (index * videoHeight)) < 1 // Within 1px of snap position
      
      if (isSnapped) {
        if (index === 0) {
          // Snapped to first duplicate (showing last video), instantly jump to real last video
          requestAnimationFrame(() => {
            container.scrollTo({
              top: videos.length * videoHeight,
              behavior: 'auto'
            })
          })
          return
        } else if (index === circularVideos.length - 1) {
          // Snapped to last duplicate (showing first video), instantly jump to real first video
          requestAnimationFrame(() => {
            container.scrollTo({
              top: 1 * videoHeight,
              behavior: 'auto'
            })
          })
          return
        }
      }
      
      setCurrentVideoIndex(index)

      // Update opacity for all video overlays
      const videoContainers = document.querySelectorAll('.video-container')
      videoContainers.forEach((videoContainer, i) => {
        const sideActions = videoContainer.querySelector('.side-actions') as HTMLElement
        const videoInfo = videoContainer.querySelector('.video-info') as HTMLElement
        
        if (sideActions && videoInfo) {
          // Calculate how far this video is from its centered position
          const videoTop = i * videoHeight
          const distanceFromCenter = Math.abs(scrollTop - videoTop)
          const fadeDistance = videoHeight * 0.4 // Fade over 40% of video height
          
          // Calculate opacity: 1 when centered, fades to 0.2 as you scroll away
          let opacity = 1 - (distanceFromCenter / fadeDistance)
          opacity = Math.max(0.2, Math.min(1, opacity)) // Clamp between 0.2 and 1
          
          sideActions.style.opacity = String(opacity)
          videoInfo.style.opacity = String(opacity)
        }
      })
    }

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(updateCurrentVideo)
    }

    // Initial update
    updateCurrentVideo()

    container.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      container.removeEventListener('scroll', handleScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [showMessages, showComments, circularVideos.length])

  // Simple drag-to-scroll with snap
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    let isDragging = false
    let startY = 0
    let startScroll = 0

    const onStart = (y: number) => {
      // Enable audio on first interaction
      if (!hasInteracted) {
        setHasInteracted(true)
      }
      isDragging = true
      startY = y
      startScroll = container.scrollTop
      container.classList.add('dragging')
      container.classList.remove('snapping')
    }

    const onMove = (y: number) => {
      if (!isDragging) return
      const delta = startY - y
      container.scrollTop = startScroll + delta
    }

    const onEnd = () => {
      if (!isDragging) return
      isDragging = false
      
      container.classList.remove('dragging')
      container.classList.add('snapping')
      
      // Snap to nearest video
      const videoHeight = container.clientHeight
      const currentPos = container.scrollTop
      let nearest = Math.round(currentPos / videoHeight)
      
      // Clamp to valid range
      nearest = Math.max(0, Math.min(nearest, circularVideos.length - 1))
      
      // Snap to the nearest video
      container.scrollTo({
        top: nearest * videoHeight,
        behavior: 'smooth'
      })
      
      // Remove snapping class after animation
      setTimeout(() => {
        container.classList.remove('snapping')
      }, 300)
    }

    // Handle wheel scroll - snap to next/prev video
    let wheelTimeout: number
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      
      clearTimeout(wheelTimeout)
      wheelTimeout = window.setTimeout(() => {
        const videoHeight = container.clientHeight
        const currentPos = container.scrollTop
        const currentIndex = Math.round(currentPos / videoHeight)
        
        let targetIndex = currentIndex
        if (e.deltaY > 0) {
          targetIndex = currentIndex + 1
        } else if (e.deltaY < 0) {
          targetIndex = currentIndex - 1
        }
        
        // Clamp to circular buffer range
        targetIndex = Math.max(0, Math.min(targetIndex, circularVideos.length - 1))
        
        container.scrollTo({
          top: targetIndex * videoHeight,
          behavior: 'smooth'
        })
      }, 50)
    }
    
    // Handle arrow keys - snap to next/prev video
    let isKeyScrolling = false
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'ArrowUp' && e.key !== 'ArrowDown') return
      if (isKeyScrolling) return // Prevent multiple key presses while scrolling
      
      e.preventDefault()
      isKeyScrolling = true
      
      const videoHeight = container.clientHeight
      const currentPos = container.scrollTop
      const currentIndex = Math.round(currentPos / videoHeight)
      
      let targetIndex = currentIndex
      if (e.key === 'ArrowDown') {
        targetIndex = currentIndex + 1
      } else if (e.key === 'ArrowUp') {
        targetIndex = currentIndex - 1
      }
      
      // Clamp to circular buffer range
      targetIndex = Math.max(0, Math.min(targetIndex, circularVideos.length - 1))
      
      container.scrollTo({
        top: targetIndex * videoHeight,
        behavior: 'smooth'
      })
      
      // Re-enable key scrolling after animation
      setTimeout(() => {
        isKeyScrolling = false
      }, 300)
    }

    // Mouse handlers
    const mouseDown = (e: MouseEvent) => {
      // Don't prevent default on initial mousedown - this blocks clicks in Firefox
      onStart(e.clientY)
    }
    const mouseMove = (e: MouseEvent) => {
      if (isDragging) {
        e.preventDefault()
        onMove(e.clientY)
      }
    }
    const mouseUp = () => onEnd()

    // Touch handlers
    const touchStart = (e: TouchEvent) => {
      // Check if touch is on action buttons - if so, don't prevent default or start scrolling
      const target = e.target as HTMLElement
      const isActionButton = target.closest('.action-button') || target.closest('.side-actions')
      
      if (isActionButton) {
        // Don't interfere with button clicks - let the onClick handler work
        return
      }
      
      e.preventDefault() // Only prevent default for video scrolling, not action buttons
      onStart(e.touches[0].clientY)
    }
    const touchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault()
        onMove(e.touches[0].clientY)
      }
    }
    const touchEnd = () => onEnd()

    // Attach listeners with proper options for cross-browser compatibility
    // Use feature detection for passive events
    let supportsPassive = false
    try {
      const opts = Object.defineProperty({}, 'passive', {
        get: function() {
          supportsPassive = true
          return false
        }
      })
      window.addEventListener('test' as any, null as any, opts)
      window.removeEventListener('test' as any, null as any, opts)
    } catch (e) {
      // Passive not supported
    }

    // Wheel
    try {
      container.addEventListener('wheel', handleWheel, supportsPassive ? { passive: false } : false as any)
    } catch {
      container.addEventListener('wheel', handleWheel)
    }
    
    // Keyboard
    window.addEventListener('keydown', handleKeyDown, supportsPassive ? { passive: false } : false as any)
    
    // Mouse
    container.addEventListener('mousedown', mouseDown, supportsPassive ? { passive: true } : false as any)
    window.addEventListener('mousemove', mouseMove, supportsPassive ? { passive: false } : false as any)
    window.addEventListener('mouseup', mouseUp, supportsPassive ? { passive: true } : false as any)
    
    // Touch
    container.addEventListener('touchstart', touchStart, supportsPassive ? { passive: false } : false as any)
    container.addEventListener('touchmove', touchMove, supportsPassive ? { passive: false } : false as any)
    container.addEventListener('touchend', touchEnd, supportsPassive ? { passive: true } : false as any)

    return () => {
      container.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
      container.removeEventListener('mousedown', mouseDown)
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
      container.removeEventListener('touchstart', touchStart)
      container.removeEventListener('touchmove', touchMove)
      container.removeEventListener('touchend', touchEnd)
    }
  }, [videos.length, showMessages, showComments, hasInteracted, circularVideos.length])

  // Handle like toggle with Firebase sync
  const toggleLike = async (videoId: number) => {
    const currentUser = getUserName()
    if (!currentUser) {
      alert('Please set a username first')
      return
    }

    if (!database) {
      console.error('Firebase not initialized - using local state only')
      // Still allow local state update even if Firebase isn't working
      setLikedVideos(prev => {
        const newLiked = new Set(prev)
        if (newLiked.has(videoId)) {
          newLiked.delete(videoId)
        } else {
          newLiked.add(videoId)
        }
        return newLiked
      })
      return
    }

    const isLiked = likedVideos.has(videoId)
    const videoKey = `video_${videoId}`
    const likeRef = ref(database, `videoLikes/${videoKey}/${currentUser}`)
    const statsRef = ref(database, `videoStats/${videoKey}`)

    try {
      // Update local state immediately for instant feedback
      setLikedVideos(prev => {
        const newLiked = new Set(prev)
        if (isLiked) {
          newLiked.delete(videoId)
        } else {
          newLiked.add(videoId)
        }
        return newLiked
      })

      // Update Firebase
      if (isLiked) {
        // Unlike: remove user from likes and decrement count
        await remove(likeRef)
        const currentStats = videoStats[videoId] || { likes: 0, bookmarks: 0 }
        await update(statsRef, {
          likes: Math.max(0, currentStats.likes - 1)
        })
      } else {
        // Like: add user to likes and increment count
        await set(likeRef, true)
        const currentStats = videoStats[videoId] || { likes: 0, bookmarks: 0 }
        await update(statsRef, {
          likes: currentStats.likes + 1
        })
      }
    } catch (error) {
      console.error('Error toggling like:', error)
      // Revert local state on error
      setLikedVideos(prev => {
        const newLiked = new Set(prev)
        if (isLiked) {
          newLiked.add(videoId)
        } else {
          newLiked.delete(videoId)
        }
        return newLiked
      })
    }
  }

  // Handle bookmark toggle with Firebase sync
  const toggleBookmark = async (videoId: number) => {
    const currentUser = getUserName()
    if (!currentUser) {
      alert('Please set a username first')
      return
    }

    if (!database) {
      console.error('Firebase not initialized - using local state only')
      // Still allow local state update even if Firebase isn't working
      setBookmarkedVideos(prev => {
        const newBookmarked = new Set(prev)
        if (newBookmarked.has(videoId)) {
          newBookmarked.delete(videoId)
        } else {
          newBookmarked.add(videoId)
        }
        return newBookmarked
      })
      return
    }

    const isBookmarked = bookmarkedVideos.has(videoId)
    const videoKey = `video_${videoId}`
    const bookmarkRef = ref(database, `videoBookmarks/${videoKey}/${currentUser}`)
    const statsRef = ref(database, `videoStats/${videoKey}`)

    try {
      // Update local state immediately for instant feedback
      setBookmarkedVideos(prev => {
        const newBookmarked = new Set(prev)
        if (isBookmarked) {
          newBookmarked.delete(videoId)
        } else {
          newBookmarked.add(videoId)
        }
        return newBookmarked
      })

      // Update Firebase
      if (isBookmarked) {
        // Unbookmark: remove user from bookmarks and decrement count
        await remove(bookmarkRef)
        const currentStats = videoStats[videoId] || { likes: 0, bookmarks: 0 }
        await update(statsRef, {
          bookmarks: Math.max(0, currentStats.bookmarks - 1)
        })
      } else {
        // Bookmark: add user to bookmarks and increment count
        await set(bookmarkRef, true)
        const currentStats = videoStats[videoId] || { likes: 0, bookmarks: 0 }
        await update(statsRef, {
          bookmarks: currentStats.bookmarks + 1
        })
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error)
      // Revert local state on error
      setBookmarkedVideos(prev => {
        const newBookmarked = new Set(prev)
        if (isBookmarked) {
          newBookmarked.add(videoId)
        } else {
          newBookmarked.delete(videoId)
        }
        return newBookmarked
      })
    }
  }

  // Handle volume toggle
  const toggleVolume = (videoId: number) => {
    const isCurrentlyMuted = mutedVideos.has(videoId)
    setMutedVideos(prev => {
      const newMuted = new Set(prev)
      if (isCurrentlyMuted) {
        newMuted.delete(videoId)
      } else {
        newMuted.add(videoId)
      }
      return newMuted
    })

    // Immediately apply the change to the current video if it's playing (skip images)
    if (circularVideos[currentVideoIndex] && circularVideos[currentVideoIndex].id === videoId) {
      const videoElements = document.querySelectorAll('.video-player')
      const currentVideo = videoElements[currentVideoIndex]
      if (currentVideo && currentVideo.tagName === 'VIDEO') {
        const videoEl = currentVideo as HTMLVideoElement
        videoEl.muted = !isCurrentlyMuted
      }
    }
  }

  // Handle video play/pause on click
  const toggleVideoPlayPause = (e: React.MouseEvent<HTMLVideoElement>, videoId: number) => {
    e.stopPropagation() // Prevent event bubbling
    const video = e.currentTarget
    
    // Only handle video elements, not images
    if (video.tagName !== 'VIDEO') return
    
    if (video.paused) {
      video.play().catch(() => {
        // Handle play error silently
      })
      setPausedVideos(prev => {
        const newSet = new Set(prev)
        newSet.delete(videoId)
        return newSet
      })
    } else {
      video.pause()
      setPausedVideos(prev => {
        const newSet = new Set(prev)
        newSet.add(videoId)
        return newSet
      })
    }
  }

  const openComments = (videoId: number) => {
    setCurrentVideoComments(videoId)
    setShowComments(true)
  }

  const closeComments = () => {
    setShowComments(false)
    setCommentInput('')
    setReplyingTo(null)
  }

  const startReply = (firebaseId: string, username: string) => {
    const mention = username.startsWith('@') ? username : `@${username}`
    const mentionText = `${mention} `
    setReplyingTo({ firebaseId, username: mention })
    setCommentInput(mentionText)
    // Focus the input after state updates
    setTimeout(() => {
      if (commentInputRef.current) {
        commentInputRef.current.focus()
        const length = mentionText.length
        commentInputRef.current.setSelectionRange(length, length)
      }
    }, 50)
  }

  const renderCommentContent = (comment: Comment, isReply = false, key?: string) => (
    <div key={key || comment.firebaseId} className={`comment-item ${isReply ? 'reply' : ''}`}>
      <img src={comment.avatar} alt={comment.username} className="comment-avatar" />
      <div className="comment-content">
        <div className="comment-username">{comment.username}</div>
        <div className="comment-text">{comment.text}</div>
        <div className="comment-footer">
          <span className="comment-time">{formatTimeAgo(comment.timestamp)}</span>
          <button
            className="comment-reply"
            onClick={() => startReply(comment.firebaseId, comment.username)}
          >
            Reply
          </button>
        </div>
      </div>
      <div className="comment-like-section">
        <button
          className={`comment-like-btn ${likedComments.has(comment.id) ? 'liked' : ''}`}
          onClick={() => toggleCommentLike(comment.id, comment.firebaseId)}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 48 48"
            fill={likedComments.has(comment.id) ? '#fe2c55' : 'none'}
            stroke={likedComments.has(comment.id) ? '#fe2c55' : '#161823'}
            strokeWidth="3"
          >
            <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z" />
          </svg>
        </button>
        {comment.likes > 0 && <span className="comment-like-count">{comment.likes}</span>}
      </div>
    </div>
  )

  const renderRepliesFlat = (
    replies?: Comment[]
  ): Array<ReturnType<typeof renderCommentContent>> => {
    if (!replies || replies.length === 0) return []
    return replies.flatMap((reply) => [
      renderCommentContent(reply, true, `reply-${reply.firebaseId}`),
      ...(reply.replies ? renderRepliesFlat(reply.replies) : [])
    ])
  }

  const toggleCommentLike = async (commentId: number, commentFirebaseId: string) => {
    if (!database || !currentVideoComments) return

    const currentUser = getUserName()
    if (!currentUser) return // User must be logged in to like

    try {
      const commentRef = ref(database, `comments/video_${currentVideoComments}/${commentFirebaseId}`)
      const commentSnapshot = await get(commentRef)

      if (commentSnapshot.exists()) {
        const commentData = commentSnapshot.val()
        const currentLikes = commentData.likes || 0
        const likedBy = commentData.likedBy || []
        const isLiked = likedBy.includes(currentUser)

        // Update likedBy array in Firebase
        let newLikedBy: string[]
        let newLikes: number

        if (isLiked) {
          // Remove user from likedBy array
          newLikedBy = likedBy.filter((user: string) => user !== currentUser)
          newLikes = Math.max(0, currentLikes - 1)
        } else {
          // Add user to likedBy array
          newLikedBy = [...likedBy, currentUser]
          newLikes = currentLikes + 1
        }

        await update(commentRef, {
          likes: newLikes,
          likedBy: newLikedBy
        })

        // Update local state
        setLikedComments(prev => {
          const newLiked = new Set(prev)
          if (isLiked) {
            newLiked.delete(commentId)
          } else {
            newLiked.add(commentId)
          }
          return newLiked
        })

        console.log(`Comment ${isLiked ? 'unliked' : 'liked'} by ${currentUser}! New count: ${newLikes}`)
      }
    } catch (error) {
      console.error('Error toggling comment like:', error)
    }
  }

  const postComment = async () => {
    if (!commentInput.trim() || !currentVideoComments) {
      console.log('Cannot post: missing input or video ID')
      return
    }
    
    const username = getUserName()
    const avatar = getUserAvatar()
    
    console.log('Posting comment with username:', username, 'avatar:', avatar)
    
    if (!username || !avatar) {
      console.error('Missing username or avatar')
      alert('Please set your username first')
      return
    }

    if (!database) {
      console.error('Firebase not initialized')
      alert('Firebase not connected. Check console.')
      return
    }

    try {
      const commentsRef = ref(database, `comments/video_${currentVideoComments}`)
      
      const commentData: any = {
        username: username.startsWith('@') ? username : `@${username}`,
        avatar: avatar,
        text: commentInput.trim(),
        likes: 0,
        timestamp: new Date().toISOString()
      }
      
      // If replying to a comment, add parent ID
      if (replyingTo) {
        commentData.parentId = replyingTo.firebaseId
        console.log('Posting reply to:', replyingTo.firebaseId)
      }
      
      console.log('Posting comment data:', commentData)
      
      await push(commentsRef, commentData)
      
      // Update comment count in videoStats
      const statsRef = ref(database, `videoStats/video_${currentVideoComments}`)
      const currentStats = videoStats[currentVideoComments] || { likes: 0, bookmarks: 0, comments: 0 }
      await update(statsRef, {
        comments: currentStats.comments + 1
      })
      
      console.log('Comment posted successfully!')
      setCommentInput('')
      setReplyingTo(null)
    } catch (error) {
      console.error('Error posting comment:', error)
      alert(`Error posting comment: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`)
    }
  }

  // Get or check if user has username
  const getUserName = () => {
    return localStorage.getItem('genuinely_username') || ''
  }

  // Get user avatar
  const getUserAvatar = () => {
    return localStorage.getItem('genuinely_avatar') || ''
  }

  // Open messages (username already set on load)
  const openMessages = () => {
    setShowMessages(true)
  }

  // Set username
  const setUsername = () => {
    const trimmed = usernameInput.trim()
    if (!trimmed) return
    
    // Pick a random profile picture from available ones
    const profilePictures = getAllProfilePictures()
    const randomAvatar = profilePictures[Math.floor(Math.random() * profilePictures.length)]
    
    localStorage.setItem('genuinely_username', trimmed)
    localStorage.setItem('genuinely_avatar', randomAvatar)
    setShowUsernameSetup(false)
    setUsernameInput('')
  }

  // Compress image before upload
  const compressImage = (file: File, maxWidth: number = 800, quality: number = 0.7): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (event) => {
        const img = new Image()
        img.src = event.target?.result as string
        img.onload = () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Calculate new dimensions
          if (width > height) {
            if (width > maxWidth) {
              height = (height * maxWidth) / width
              width = maxWidth
            }
          } else {
            if (height > maxWidth) {
              width = (width * maxWidth) / height
              height = maxWidth
            }
          }

          canvas.width = width
          canvas.height = height

          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob)
              } else {
                reject(new Error('Canvas toBlob failed'))
              }
            },
            'image/jpeg',
            quality
          )
        }
        img.onerror = reject
      }
      reader.onerror = reject
    })
  }

  // Upload image to Firebase Storage
  const uploadImage = async (file: File): Promise<string> => {
    if (!storage || !database) {
      throw new Error('Firebase not initialized')
    }

    // Compress the image first
    const compressedBlob = await compressImage(file)
    
    // Create a unique filename
    const filename = `chat-images/${Date.now()}_${Math.random().toString(36).substring(7)}.jpg`
    const imageRef = storageRef(storage, filename)
    
    // Upload the compressed image
    await uploadBytes(imageRef, compressedBlob)
    
    // Get the download URL
    const downloadURL = await getDownloadURL(imageRef)
    return downloadURL
  }

  // Handle image selection
  const handleImageSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file')
      return
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('Image is too large. Please select an image under 10MB')
      return
    }

    setUploadingImage(true)

    try {
      // Upload image and get URL
      const imageUrl = await uploadImage(file)
      
      // Send message with image
      const newMessage = {
        text: messageInput.trim() || '', // Optional caption
        username: getUserName(),
        timestamp: Date.now(),
        imageUrl: imageUrl
      }

      const messagesRef = ref(database!, 'messages')
      await push(messagesRef, newMessage)
      console.log('Image message sent:', newMessage)
      
      setMessageInput('') // Clear caption
    } catch (error) {
      console.error('Error uploading image:', error)
      alert(`Error uploading image: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`)
    } finally {
      setUploadingImage(false)
      // Reset the file input
      event.target.value = ''
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!messageInput.trim()) return
    
    const username = getUserName()
    if (!username) {
      alert('Please set a username first')
      return
    }
    
    if (!database) {
      console.error('Firebase not initialized')
      alert('Chat is temporarily unavailable. Please check your Firebase configuration.')
      return
    }
    
    const newMessage = {
      text: messageInput,
      username: username,
      timestamp: Date.now()
    }
    
    try {
      // Push to Firebase Realtime Database
      const messagesRef = ref(database, 'messages')
      await push(messagesRef, newMessage)
      console.log('Message sent successfully:', newMessage)
      setMessageInput('')
    } catch (error) {
      console.error('Error sending message:', error)
      alert(`Error sending message: ${error instanceof Error ? error.message : 'Unknown error'}. Check console for details.`)
    }
  }

  // Load chat history and listen for real-time updates
  useEffect(() => {
    if (!database || !showMessages) {
      return
    }
    
    const userUsername = getUserName()
    console.log('User username:', userUsername)
    
    if (!userUsername) {
      console.warn('No username set')
      return
    }
    
    const messagesRef = ref(database!, 'messages')
    const messagesQuery = query(messagesRef, orderByChild('timestamp'), limitToLast(100))
    
    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val()
      console.log('Firebase data received:', data)
      if (data) {
        const currentUser = getUserName() // Get fresh username on each update
        const messagesList = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          text: msg.text,
          username: msg.username || 'Anonymous',
          timestamp: new Date(msg.timestamp),
          isUser: msg.username && currentUser && msg.username === currentUser,
          imageUrl: msg.imageUrl
        }))
        console.log('Messages list:', messagesList)
        console.log('Current user:', currentUser)
        setMessages(messagesList)
      } else {
        setMessages([])
      }
    }, (error) => {
      console.error('Firebase read error:', error)
    })
    
    return () => unsubscribe()
  }, [showMessages])

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load comments for current video from Firebase
  useEffect(() => {
    if (!database || !showComments || !currentVideoComments) {
      return
    }

    try {
      const commentsRef = ref(database!, `comments/video_${currentVideoComments}`)
      const commentsQuery = query(commentsRef, orderByChild('timestamp'))
      
      const unsubscribe = onValue(commentsQuery, (snapshot) => {
        try {
          const data = snapshot.val()
          if (data && typeof data === 'object') {
            // First, parse all comments with their parent IDs
            const allComments = Object.entries(data).map(([id, comment]: [string, any]) => {
              const numericId = parseInt(id.replace(/[^0-9]/g, '').slice(-10), 10) || Math.floor(Math.random() * 1000000000)
              
              return {
                id: numericId,
                firebaseId: id,
                username: comment.username || 'Anonymous',
                avatar: comment.avatar || '',
                text: comment.text || '',
                likes: typeof comment.likes === 'number' ? comment.likes : 0,
                timestamp: comment.timestamp ? new Date(comment.timestamp) : new Date(),
                parentId: comment.parentId || undefined,
                replies: []
              }
            })
            
            // Organize into threaded structure
            const commentMap = new Map<string, Comment>()
            const topLevelComments: Comment[] = []
            
            // First pass: add all comments to map
            allComments.forEach(comment => {
              commentMap.set(comment.firebaseId, comment)
            })
            
            // Second pass: organize into threads
            allComments.forEach(comment => {
              if (comment.parentId && commentMap.has(comment.parentId)) {
                // This is a reply, add to parent's replies
                const parent = commentMap.get(comment.parentId)!
                if (!parent.replies) parent.replies = []
                parent.replies.push(comment)
              } else {
                // This is a top-level comment
                topLevelComments.push(comment)
              }
            })
            
            setVideoComments(prev => ({
              ...prev,
              [currentVideoComments]: topLevelComments
            }))

            // Update comment count in videoStats (count all comments including replies)
            const totalCommentCount = allComments.length
            const statsRef = ref(database!, `videoStats/video_${currentVideoComments}`)
            update(statsRef, {
              comments: totalCommentCount
            }).catch(err => {
              console.error('Error updating comment count:', err)
            })

            // Update liked comments state based on current user's likes
            const currentUser = getUserName()
            if (currentUser) {
              const userLikedComments = new Set<number>()
              allComments.forEach(comment => {
                const commentData = data[comment.firebaseId]
                const likedBy = commentData.likedBy || []
                if (likedBy.includes(currentUser)) {
                  userLikedComments.add(comment.id)
                }
              })
              setLikedComments(userLikedComments)
            }
          } else {
            // No comments yet for this video
            setVideoComments(prev => ({
              ...prev,
              [currentVideoComments]: []
            }))
            // Clear liked comments state when no comments
            setLikedComments(new Set())
          }
        } catch (parseError) {
          console.error('Error parsing comments:', parseError)
          setVideoComments(prev => ({
            ...prev,
            [currentVideoComments]: []
          }))
          // Clear liked comments state on error
          setLikedComments(new Set())
        }
      }, (error) => {
        console.error('Firebase comments read error:', error)
        // Set empty array on error so UI still shows
        setVideoComments(prev => ({
          ...prev,
          [currentVideoComments]: []
        }))
        // Clear liked comments state on error
        setLikedComments(new Set())
      })
      
      return () => {
        try {
          unsubscribe()
        } catch (e) {
          console.error('Error unsubscribing from comments:', e)
        }
      }
    } catch (error) {
      console.error('Error setting up comments listener:', error)
    }
  }, [showComments, currentVideoComments])

  // Load video likes and bookmarks from Firebase on mount
  useEffect(() => {
    if (!database) return

    const currentUser = getUserName()
    if (!currentUser) return

    // Load user's liked videos
    const likesRef = ref(database, 'videoLikes')
    const likesUnsubscribe = onValue(likesRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const userLikedVideos = new Set<number>()
        Object.keys(data).forEach(videoKey => {
          const videoId = parseInt(videoKey.replace('video_', ''))
          if (data[videoKey] && data[videoKey][currentUser]) {
            userLikedVideos.add(videoId)
          }
        })
        setLikedVideos(userLikedVideos)
      }
    }, (error) => {
      console.error('Error loading likes:', error)
    })

    // Load user's bookmarked videos
    const bookmarksRef = ref(database, 'videoBookmarks')
    const bookmarksUnsubscribe = onValue(bookmarksRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const userBookmarkedVideos = new Set<number>()
        Object.keys(data).forEach(videoKey => {
          const videoId = parseInt(videoKey.replace('video_', ''))
          if (data[videoKey] && data[videoKey][currentUser]) {
            userBookmarkedVideos.add(videoId)
          }
        })
        setBookmarkedVideos(userBookmarkedVideos)
      }
    }, (error) => {
      console.error('Error loading bookmarks:', error)
    })

    // Load video stats (like/bookmark/comment counts)
    const statsRef = ref(database, 'videoStats')
    const statsUnsubscribe = onValue(statsRef, (snapshot) => {
      const data = snapshot.val()
      if (data) {
        const stats: { [videoId: number]: { likes: number; bookmarks: number; comments: number } } = {}
        Object.keys(data).forEach(videoKey => {
          const videoId = parseInt(videoKey.replace('video_', ''))
          stats[videoId] = {
            likes: data[videoKey].likes || 0,
            bookmarks: data[videoKey].bookmarks || 0,
            comments: data[videoKey].comments || 0
          }
        })
        setVideoStats(stats)
      }
    }, (error) => {
      console.error('Error loading video stats:', error)
    })

    return () => {
      likesUnsubscribe()
      bookmarksUnsubscribe()
      statsUnsubscribe()
    }
  }, [database])

  return (
    <div className="app-container">
      {/* Loading Screen */}
      <div className={`loading-screen ${!isInitialLoading ? 'hidden' : ''}`}>
        <div className="loading-content">
          <img src={preloaderLogo} alt="doomscroll" className="preloader-logo" />
        </div>
      </div>

      {/* Animated grain overlay for gradient banding fix */}
      {/* DISABLED: Uncomment below to re-enable grain/noise effect */}
      {/* <Grain opacity={0.03} blendMode="screen" /> */}
      
      <div 
        className="iphone-frame"
        style={{
          filter: `
            drop-shadow(0 0 60px rgba(${glowColor}, 0.38))
            drop-shadow(0 0 100px rgba(${glowColor}, 0.29))
            drop-shadow(0 0 140px rgba(${glowColor}, 0.19))
            drop-shadow(0 0 200px rgba(${glowColor}, 0.14))
          `,
          opacity: isInitialLoading ? 1 : 1,
          visibility: isInitialLoading ? 'visible' : 'visible',
          display: isInitialLoading ? 'block' : 'block'
        }}
      >
        {/* Side Buttons */}
        <div className="volume-button"></div>
        <div className="power-button"></div>
        
        <div className="side">
          <div className="line"></div>
          
          {/* Notch with sensors */}
          <div className="header">
            <div className="sensor-1"></div>
            <div className="sensor-2"></div>
          </div>
          
          {/* Screen Content */}
          <div 
            className="iphone-screen" 
            ref={screenRef}
          >
          {!showMessages ? (
            <>
          {/* TikTok Status Bar */}
          <div className="status-bar">
            <span className="time">7:08</span>
            <div className="status-icons">
              {/* Cellular Signal */}
              <img src={cellularIcon} alt="cellular" className="status-icon" />
              {/* WiFi */}
              <img src={wifiIcon} alt="wifi" className="status-icon" />
              {/* Battery */}
              <img src={batteryIcon} alt="battery" className="status-icon" />
            </div>
          </div>

          {/* Top Navigation */}
          <div className="top-nav">
            <button className="nav-item">Following</button>
            <button className="nav-item active">For You</button>
          </div>

          {/* Scrollable Video Feed */}
          <div className="video-feed" ref={scrollContainerRef}>
            {circularVideos.map((video, index) => {
              // Only preload current video for faster mobile loading
              const isCurrent = index === currentVideoIndex;
              
              return (
              <div key={`${video.id}-${index}`} className="video-container">
                {video.imageUrl ? (
                  <img 
                    className="video-player"
                    src={video.imageUrl}
                    alt={video.caption}
                    style={{ objectFit: 'cover', width: '100%', height: '100%', pointerEvents: 'none' }}
                  />
                ) : (
                  <video 
                    className={`video-player ${pausedVideos.has(video.id) ? 'paused' : ''}`}
                    src={video.videoUrl}
                    loop
                    playsInline
                    preload={isCurrent ? "auto" : "none"}
                    crossOrigin="anonymous"
                    onClick={(e) => toggleVideoPlayPause(e, video.id)}
                  />
                )}
                
                {/* Play Button Overlay - only show for videos */}
                {!video.imageUrl && pausedVideos.has(video.id) && (
                  <div className="play-button-overlay">
                    <svg viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                )}
                
                {/* Right Side Actions */}
                <div className="side-actions">
                  <div className="action-button avatar-section">
                    <img src={video.avatarUrl} alt={video.username} className="avatar" />
                    <div className="plus-button">+</div>
                  </div>
                  <div 
                    className={`action-button like-button ${likedVideos.has(video.id) ? 'liked' : ''}`}
                    onClick={() => toggleLike(video.id)}
                  >
                    <svg className="action-icon" viewBox="0 0 48 48" fill={likedVideos.has(video.id) ? '#fe2c55' : 'white'}>
                      <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                    </svg>
                    <span className="count">{formatCount(videoStats[video.id]?.likes ?? video.likes)}</span>
                  </div>
                  <div className="action-button" onClick={() => openComments(video.id)}>
                    <img src={commentsIcon} alt="Comments" className="action-icon-img comments-icon" />
                    <span className="count">{formatCount(videoStats[video.id]?.comments ?? video.comments)}</span>
                  </div>
                  <div 
                    className={`action-button bookmark-button ${bookmarkedVideos.has(video.id) ? 'bookmarked' : ''}`}
                    onClick={() => toggleBookmark(video.id)}
                  >
                    <svg className="action-icon" viewBox="0 0 48 48" fill={bookmarkedVideos.has(video.id) ? '#fe2c55' : 'white'}>
                      <path d="M38 4H10v40l14-10 14 10V4z"/>
                    </svg>
                    <span className="count">{formatCount(videoStats[video.id]?.bookmarks ?? video.bookmarks)}</span>
                  </div>
                  <div className="action-button" onClick={() => toggleVolume(video.id)}>
                    <svg className="action-icon" viewBox="0 0 48 48" fill="white">
                      {/* Speaker cone */}
                      <path d="M6 16h8l10-10v36L14 32H6V16z"/>
                      {/* Sound waves */}
                      {!mutedVideos.has(video.id) && (
                        <>
                          <path d="M28 18c2 2 2 10 0 12" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                          <path d="M32 14c4 4 4 16 0 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                          <path d="M36 10c6 6 6 22 0 28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                        </>
                      )}
                      {/* Mute slash */}
                      {mutedVideos.has(video.id) && (
                        <path d="M8 40L40 8" stroke="white" strokeWidth="3" strokeLinecap="round"/>
                      )}
                    </svg>
                  </div>
                  {/* DISABLED: Forward/share action button - Uncomment below to re-enable */}
                  {/* <div className="action-button">
                    <img src={forwardIcon} alt="Forward" className="action-icon-img" />
                    <span className="count">{formatCount(video.shares)}</span>
                  </div> */}
                </div>

                {/* Bottom Info */}
                <div className="video-info">
                  <div className="username">{video.username}</div>
                  <div className="caption">{video.caption}</div>
                  <div className="audio-info">
                    <span>🎵 Original Audio - {video.username}</span>
                  </div>
                </div>
              </div>
              );
            })}
          </div>

          {/* Bottom Dock - Always show except when comments open */}
          {!showComments && (
            <div className="dock">
              <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="dock-app">
                <div className="app-icon">
                  <img src={pumpfunIcon} alt="Pumpfun" className="app-icon-img" />
                </div>
              </a>
              <div className="dock-app" onClick={() => { setShowMessages(false); setShowComments(false); }}>
                <div className="app-icon">
                  <img src={tiktokIcon} alt="TikTok" className="app-icon-img" />
                </div>
              </div>
              <a href="https://twitter.com/tryDoomscroll" target="_blank" rel="noopener noreferrer" className="dock-app">
                <div className="app-icon">
                  <img src={xIcon} alt="X" className="app-icon-img" />
                </div>
              </a>
              <div className="dock-app" onClick={openMessages}>
                <div className="app-icon">
                  <img src={messagesIcon} alt="Messages" className="app-icon-img" />
                </div>
              </div>
            </div>
          )}
          </>
          ) : (
            <>
            {/* Bottom Dock - Always show in messages */}
            <div className="dock">
              <a href="https://pump.fun" target="_blank" rel="noopener noreferrer" className="dock-app">
                <div className="app-icon">
                  <img src={pumpfunIcon} alt="Pumpfun" className="app-icon-img" />
                </div>
              </a>
              <div className="dock-app" onClick={() => { setShowMessages(false); setShowComments(false); }}>
                <div className="app-icon">
                  <img src={tiktokIcon} alt="TikTok" className="app-icon-img" />
                </div>
              </div>
              <a href="https://twitter.com/tryDoomscroll" target="_blank" rel="noopener noreferrer" className="dock-app">
                <div className="app-icon">
                  <img src={xIcon} alt="X" className="app-icon-img" />
                </div>
              </a>
              <div className="dock-app" onClick={openMessages}>
                <div className="app-icon">
                  <img src={messagesIcon} alt="Messages" className="app-icon-img" />
                </div>
              </div>
            </div>

            {/* iMessage UI */}
            <div className="imessage-container">
              {/* Messages Header */}
              <div className="imessage-header">
                <button className="back-button" onClick={() => setShowMessages(false)}>
                  <svg width="14" height="22" viewBox="0 0 12 20" fill="none">
                    <path d="M10 2L2 10L10 18" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="chat-info">
                  <div className="chat-name">doomscrollers</div>
                  <div className="chat-members">{messages.length} messages</div>
                </div>
                <div className="header-spacer"></div>
              </div>

              {/* Messages List */}
              <div className="messages-list">
                {messages.map((msg) => (
                  <div key={msg.id} className={`message-wrapper ${msg.isUser ? 'user' : 'other'}`}>
                    {!msg.isUser && <div className="message-sender">{msg.username}</div>}
                    <div className={`message-bubble ${msg.isUser ? 'user' : 'other'}`}>
                      {msg.imageUrl && (
                        <img 
                          src={msg.imageUrl} 
                          alt="Shared image" 
                          className="message-image"
                          loading="lazy"
                        />
                      )}
                      {msg.text && <div className="message-text">{msg.text}</div>}
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>


              {/* Message Input */}
              <div className="message-input-container">
                <div className="input-wrapper">
                  {/* Image Upload Button */}
                  <label className="image-upload-button" title="Upload image">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      disabled={uploadingImage}
                      style={{ display: 'none' }}
                    />
                    {uploadingImage ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" opacity="0.25"/>
                        <path d="M12 2 A10 10 0 0 1 22 12" strokeLinecap="round">
                          <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite"/>
                        </path>
                      </svg>
                    ) : (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    )}
                  </label>
                  
                  <input
                    type="text"
                    className="message-input"
                    placeholder="iMessage"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !uploadingImage) sendMessage()
                    }}
                    disabled={uploadingImage}
                  />
                  <button 
                    className="send-button" 
                    onClick={sendMessage}
                    disabled={!messageInput.trim() || uploadingImage}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M2 12L22 2L16 22L11 13L2 12Z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            </>
          )}

          {/* Username Setup Modal */}
          {showUsernameSetup && (
            <div className="username-modal-overlay">
              <div className="username-modal">
                <h2>Welcome to doomscroll.now</h2>
                <p>Choose your username to get started</p>
                <input
                  type="text"
                  className="username-input"
                  placeholder="Enter username..."
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && usernameInput.trim()) setUsername()
                  }}
                  autoFocus
                  maxLength={20}
                />
                <div className="username-modal-buttons">
                  <button 
                    className="username-submit-btn username-submit-full"
                    onClick={setUsername}
                    disabled={!usernameInput.trim()}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Comments Overlay */}
          {showComments && currentVideoComments && (
            <div className="comments-overlay">
              <div className="comments-container">
                {/* Header */}
                <div className="comments-header">
                  <span className="comments-count">
                    {videoComments[currentVideoComments]?.length || 0} comments
                  </span>
                  <button className="comments-close" onClick={closeComments}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    </svg>
                  </button>
                </div>

                {/* Comments List */}
                <div className="comments-list">
                  {(!videoComments[currentVideoComments] || videoComments[currentVideoComments].length === 0) ? (
                    <div className="comments-empty">
                      <p>No comments yet</p>
                      <span>Be the first to comment!</span>
                    </div>
                  ) : (
                    videoComments[currentVideoComments].map((comment) => (
                      <div key={`thread-${comment.firebaseId}`} className="comment-thread">
                        {renderCommentContent(comment)}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="comment-replies">
                            {renderRepliesFlat(comment.replies)}
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>

                {/* Comment Input */}
                <div className="comment-input-container">
                  {replyingTo && (
                    <div className="replying-to">
                      Replying to {replyingTo.username}
                      <button onClick={() => setReplyingTo(null)}>✕</button>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                    <input
                      ref={commentInputRef}
                      type="text"
                      className="comment-input"
                      placeholder={replyingTo ? `Reply to ${replyingTo.username}...` : "Add comment..."}
                      value={commentInput}
                      onChange={(e) => setCommentInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && commentInput.trim()) postComment()
                      }}
                    />
                    <button 
                      className="comment-post-btn" 
                      disabled={!commentInput.trim()}
                      onClick={postComment}
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  )
}

export default App

