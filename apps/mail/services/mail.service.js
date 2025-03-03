import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const mail_KEY = 'mailDB'

const loggedinUser = {
  email: 'Maoryad@TriValut.com',
  fullname: 'Maor Yadegar',
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
}

function query(filterBy = {}) {
  return storageService.query(mail_KEY).then((mails) => {
    // console.log('mails:', mails)
    if (filterBy.mail) {
      const regExp = new RegExp(filterBy.vendor, 'i')
      mails = mails.filter((mail) => regExp.test(mail.vendor))
    }
    if (filterBy.minSpeed) {
      mails = mails.filter((mail) => mail.speed >= filterBy.minSpeed)
    }
    return mails
  })
}

function get(mailId) {
  return storageService
    .get(mail_KEY, mailId)
    .then((mail) => _setNextPrevmailId(mail))
}

function remove(mailId) {
  // return Promise.reject('Oh No!')
  return storageService.remove(mail_KEY, mailId)
}

function save(mail) {
  if (mail.id) {
    return storageService.put(mail_KEY, mail)
  } else {
    return storageService.post(mail_KEY, mail)
  }
}

function getEmptymail() {
  return {
    createdAt: Date.now(),
    subject: ' ',
    body: ' ',
    isRead: false,
    isStarred: false,
    isArchive: false,
    isDraft: true,
    isDeleted: false,
    sentAt: null,
    removeAt: null,
    from: loggedinUser.email,
    to: ' ',
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
        true,
        false,
        false,
        false,
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
        'Maoryad@TriValut.com',
        'Tomera.almog9@TriValut.com'
      )
    )
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
