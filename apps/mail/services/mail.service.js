import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const mail_KEY = 'mailDB'

const loggedinUser = {
  email: 'Tomera.almog9@TriValut.com',
  fullname: 'Tomer Almog',
}

_createmails()

export const mailService = {
  query,
  get,
  remove,
  save,
  getSpeedStats,
  getVendorStats,
  getDefaultFilter,
  getFilterFromSearchParams,
  getEmptymail,
  queryUnread,
  getAccount,
}

// function query(filterBy = {}) {
//   return storageService.query(mail_KEY).then((mails) => {
//     console.log('mails:', mails)
//     if (filterBy.mail) {
//       const regExp = new RegExp(filterBy.vendor, 'i')
//       mails = mails.filter((mail) => regExp.test(mail.vendor))
//     }
//     if (filterBy.minSpeed) {
//       mails = mails.filter((mail) => mail.speed >= filterBy.minSpeed)
//     }
//     return mails
//   })
// }

function query(filterBy = {}, folder) {
  return storageService.query(mail_KEY).then((mails) => {
    console.log('mails:', mails)

    if (folder === 'inbox') {
      mails = mails.filter(
        (mail) =>
          !mail.isArchive && !mail.isDeleted && !mail.isDraft && !mail.sentAt
      )
    }

    if (folder === 'starred') {
      mails = mails.filter((mail) => mail.isStarred)
    }

    if (folder === 'sent') {
      mails = mails.filter((mail) => mail.sentAt !== null)
    }

    if (folder === 'draft') {
      mails = mails.filter((mail) => mail.isDraft)
    }

    if (folder === 'trash') {
      mails = mails.filter((mail) => mail.isDeleted)
    }

    // הוספת סינון טקסט
    if (filterBy.txt) {
      const searchTerm = filterBy.txt.toLowerCase()
      mails = mails.filter(
        (mail) =>
          mail.subject.toLowerCase().includes(searchTerm) ||
          mail.body.toLowerCase().includes(searchTerm) ||
          mail.from.toLowerCase().includes(searchTerm)
      )
    }

    return mails
  })
}

function queryUnread() {
  return storageService.query(mail_KEY).then((mails) => {
    console.log('All mails:', mails)

    const unreadMails = mails.filter(
      (mail) => !mail.isRead || !mail.sentAt || !mail.isDraft
    )
    return unreadMails.length
  })
}
function get(mailId) {
  return storageService
    .get(mail_KEY, mailId)
    .then((mail) => _setNextPrevmailId(mail))
}

function getAccount() {
  return loggedinUser
}

function remove(mailId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(mail_KEY, mailId)
}

function save(mail) {
  console.log('save')
  if (mail.id) {
    return storageService.put(mail_KEY, mail)
  } else {
    return storageService.post(mail_KEY, mail)
  }
}

function getEmptymail() {
  return {
    createdAt: Date.now(),
    subject: '',
    body: '',
    isRead: false,
    isStarred: false,
    isArchive: false,
    isDraft: true,
    isDeleted: false,
    isImportent: false,
    sentAt: null,
    removeAt: null,
    from: loggedinUser.email,
    to: '',
  }
}

function getDefaultFilter() {
  return { vendor: '', minSpeed: '' }
}

function getFilterFromSearchParams(searchParams) {
  console.log('searchParams:', searchParams)

  // const x = Object.fromEntries(searchParams)
  // console.log('x:', x)

  const type = searchParams.get('type') || ''
  // console.log('vendor:', vendor)
  const txt = searchParams.get('txt') || ''
  const label = searchParams.get('label') || ''
  // console.log('minSpeed:', minSpeed)

  return { type, txt, label }
}

function _createmails() {
  let mails = utilService.loadFromStorage(mail_KEY)
  if (!mails || !mails.length) {
    mails = []
    mails.push(
      _createmail(
        'Whats up?',
        'Long time no see, lets code sometime',
        false,
        false,
        false,
        false,
        false,
        true,
        'Maoryad@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Whats up?',
        'Long time no see, lets code sometime',
        false,
        true,
        true,
        false,
        false,
        true,
        'Maoryad@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Time to code!',
        'lets make TriValt the best app ever!',
        true,
        false,
        false,
        false,
        true,
        false,
        'Maoryad@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Meeting Minutes - Product Review',
        'Team, attached are the minutes from our last product review meeting. Please review and provide feedback by Friday. We need to finalize the roadmap for Q2.',
        false,
        true,
        false,
        false,
        false,
        true,
        'Sarah.Cohen@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Website Redesign Proposal',
        "Hi Marketing Team, I've attached our proposal for the website redesign. The focus is on improving user experience and conversion rates. Looking forward to your thoughts!",
        true,
        false,
        false,
        false,
        false,
        false,
        'Daniel.designer@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Bug Report: Login Issues',
        'Some users are reporting intermittent login issues on the mobile app. Can we investigate this ASAP? This seems to be affecting approximately 5% of our user base according to the analytics.',
        false,
        false,
        false,
        false,
        false,
        true,
        'support@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Vacation Request',
        "I would like to request time off from August 15-22 for a family vacation. All my projects will be up to date before I leave. I've already discussed coverage with the team.",
        true,
        false,
        true,
        false,
        false,
        false,
        'Tomera.almog9@TriValut.com',
        'HR@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'New Feature Ideas',
        "I've been thinking about some potential new features for our next sprint. Can we schedule a brainstorming session? I have some thoughts on how we can improve the note-taking functionality.",
        true,
        true,
        false,
        false,
        false,
        false,
        'Tomera.almog9@TriValut.com',
        'dev-team@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Quarterly Budget Review',
        "Please find attached the Q3 budget analysis. We're currently under budget by 5%, which is great news for our annual targets. Let's discuss allocation of the surplus at our next meeting.",
        false,
        false,
        false,
        false,
        false,
        false,
        'finance@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Interview Schedule - Frontend Developer',
        "We have three candidates for the frontend developer position. Interviews will be held next Tuesday and Wednesday. Please confirm your availability. I've attached their resumes for your review.",
        true,
        false,
        false,
        false,
        false,
        true,
        'HR@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Happy Birthday!',
        'Wishing you a fantastic birthday! The team has organized a small celebration in the break room at 3 PM today. Hope to see you there!',
        false,
        true,
        false,
        false,
        false,
        false,
        'office-admin@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Draft: Project Proposal',
        'This is a draft of the upcoming client proposal. Still need to add budget details and timeline specifics. Let me know if you have any initial thoughts.',
        true,
        false,
        false,
        true,
        false,
        false,
        'Tomera.almog9@TriValut.com',
        ''
      )
    )

    mails.push(
      _createmail(
        'Welcome to TriVault Team!',
        "Welcome aboard! We're excited to have you join our team. Your orientation is scheduled for Monday at 9 AM in Conference Room A. Looking forward to working with you!",
        false,
        false,
        false,
        false,
        true,
        false,
        'HR@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Annual Company Retreat Planning',
        "Let's discuss ideas and locations for our upcoming team-building retreat. We want to create an unforgettable experience that strengthens our team bond.",
        false,
        false,
        true,
        false,
        false,
        true,
        'events@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Product Market Research Results',
        "Our latest market research reveals exciting opportunities for expansion. We've identified key trends that could drive our next innovation cycle.",
        true,
        true,
        false,
        false,
        false,
        false,
        'research@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Open Source Contribution Strategy',
        "We're exploring ways to increase our involvement in open-source projects. This could significantly boost our tech reputation and attract top talent.",
        false,
        false,
        false,
        false,
        true,
        true,
        'dev-strategy@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Sustainability Initiative Kickoff',
        'Our new green initiative aims to reduce our carbon footprint and implement eco-friendly practices across all company operations.',
        true,
        false,
        true,
        false,
        false,
        false,
        'sustainability@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'AI Ethics Workshop Invitation',
        "Join our upcoming workshop on ethical AI development. We'll discuss responsible innovation and potential societal impacts of our technologies.",
        false,
        true,
        false,
        false,
        false,
        true,
        'ethics@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Blockchain Innovation Seminar',
        'Explore the cutting-edge developments in blockchain technology and its potential transformative impact on our industry.',
        false,
        true,
        false,
        false,
        false,
        true,
        'tech-innovations@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Quantum Computing Research Insights',
        'Deep dive into our latest quantum computing research and breakthrough potential for solving complex computational challenges.',
        false,
        true,
        false,
        false,
        false,
        true,
        'quantum-research@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Future of Machine Learning Symposium',
        'Join us for an in-depth exploration of machine learning trends and their implications for next-generation technological solutions.',
        false,
        true,
        false,
        false,
        false,
        true,
        'ml-innovations@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Cybersecurity Emerging Technologies Forum',
        'A comprehensive overview of emerging cybersecurity technologies and strategies to protect against evolving digital threats.',
        false,
        true,
        false,
        false,
        false,
        true,
        'security-innovations@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
    mails.push(
      _createmail(
        'Cloud Native Architecture Summit',
        'Exploring next-generation cloud architectures and their impact on scalable enterprise solutions.',
        false,
        true,
        false,
        false,
        false,
        true,
        'cloud-architecture@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Edge Computing Revolution',
        'Insights into how edge computing is transforming data processing and real-time analytics across industries.',
        false,
        true,
        false,
        false,
        false,
        true,
        'edge-tech@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Green Tech Innovation Conference',
        'Comprehensive exploration of sustainable technology solutions and their potential to address global environmental challenges.',
        false,
        true,
        false,
        false,
        false,
        true,
        'sustainability-tech@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Augmented Reality User Experience Design',
        'Cutting-edge approaches to designing immersive and intuitive augmented reality experiences for enterprise applications.',
        false,
        true,
        false,
        false,
        false,
        true,
        'ar-design@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Data Privacy and Ethical AI Roundtable',
        'Critical discussions on balancing technological innovation with robust data protection and ethical considerations.',
        false,
        true,
        false,
        false,
        false,
        true,
        'ethics-tech@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Internet of Things (IoT) Strategic Insights',
        'Comprehensive analysis of IoT technologies and their transformative potential across various industry sectors.',
        false,
        true,
        false,
        false,
        false,
        true,
        'iot-innovations@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'New Learning Platform Launch',
        "We're excited to introduce our new employee learning and development platform. Enhance your skills with personalized training modules.",
        false,
        false,
        true,
        false,
        true,
        false,
        'learning@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Innovative Tech Challenge',
        "Calling all innovators! We're launching an internal tech challenge to spark creativity and solve real-world problems.",
        true,
        true,
        false,
        false,
        false,
        true,
        'innovation@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Customer Success Stories',
        "Check out how our latest product features have transformed our clients' businesses. Real impact, real results!",
        false,
        false,
        false,
        false,
        true,
        false,
        'marketing@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Global Expansion Update',
        "Exciting news! We're preparing to launch our services in three new international markets next quarter.",
        true,
        false,
        true,
        false,
        false,
        true,
        'global-strategy@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.push(
      _createmail(
        'Diversity and Inclusion Initiatives',
        'Our commitment to creating an inclusive workplace continues to be a top priority. Learn about our latest D&I programs and how you can get involved.',
        false,
        true,
        false,
        false,
        true,
        false,
        'hr@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )

    mails.forEach((mail) => {
      if (mail.from === 'Tomera.almog9@TriValut.com' && !mail.isDraft) {
        mail.sentAt =
          Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)
      }
    })

    utilService.saveToStorage(mail_KEY, mails)
  }
}

function _createmail(
  subject,
  body,
  isRead,
  isStarred,
  isArchive,
  isDraft,
  isDeleted,
  isImportent,
  from,
  to
) {
  const mail = {
    id: utilService.makeId(),
    createdAt: Date.now(),
    subject,
    body,
    isRead,
    isStarred,
    isArchive,
    isDraft,
    isDeleted,
    sentAt: null,
    removeAt: null,
    isImportent,
    from,
    to,
  }
  return mail
}

// ststs

function getSpeedStats() {
  return storageService.query(mail_KEY).then((mails) => {
    // console.log('mails:', mails)
    const mailCountBySpeedMap = _getmailCountBySpeedMap(mails)
    // console.log('mailCountBySpeedMap:', mailCountBySpeedMap)
    const data = Object.keys(mailCountBySpeedMap).map((speedName) => ({
      title: speedName,
      value: Math.round((mailCountBySpeedMap[speedName] / mails.length) * 100),
    }))
    // console.log('data:', data)
    return data
  })
}

function getVendorStats() {
  return storageService.query(mail_KEY).then((mails) => {
    // console.log('mails:', mails)
    const mailCountByVendorMap = _getmailCountByVendorMap(mails)
    // console.log('mailCountByVendorMap:', mailCountByVendorMap)
    const data = Object.keys(mailCountByVendorMap).map((vendor) => ({
      title: vendor,
      value: Math.round((mailCountByVendorMap[vendor] / mails.length) * 100),
    }))
    // console.log('data:', data)
    return data
  })
}

function _getmailCountBySpeedMap(mails) {
  const mailCountBySpeedMap = mails.reduce(
    (map, mail) => {
      if (mail.speed < 120) map.slow++
      else if (mail.speed < 200) map.normal++
      else map.fast++
      return map
    },
    { slow: 0, normal: 0, fast: 0 }
  )
  return mailCountBySpeedMap
}

function _getmailCountByVendorMap(mails) {
  const mailCountByVendorMap = mails.reduce((map, mail) => {
    if (!map[mail.vendor]) map[mail.vendor] = 0
    map[mail.vendor]++
    return map
  }, {})
  return mailCountByVendorMap
}

function _setNextPrevmailId(mail) {
  return storageService.query(mail_KEY).then((mails) => {
    const mailIdx = mails.findIndex((currmail) => currmail.id === mail.id)
    const nextmail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
    const prevmail = mails[mailIdx - 1]
      ? mails[mailIdx - 1]
      : mails[mails.length - 1]
    mail.nextmailId = nextmail.id
    mail.prevmailId = prevmail.id
    return mail
  })
}
