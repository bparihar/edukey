// One-time script: create the first admin user (run with `payload run`)
import { getPayload } from 'payload'
import config from '@payload-config'

const payload = await getPayload({ config })

const email = process.env.ADMIN_EMAIL || 'admin@edukey.in'
const password = process.env.ADMIN_PASSWORD

if (!password) {
  console.error('Set ADMIN_PASSWORD env var')
  process.exit(1)
}

const existing = await payload.find({
  collection: 'users',
  where: { email: { equals: email } },
  overrideAccess: true,
})

if (existing.totalDocs > 0) {
  console.log(`User ${email} already exists — skipping`)
} else {
  await payload.create({
    collection: 'users',
    data: { email, password, name: 'Admin' },
    overrideAccess: true,
  })
  console.log(`Created admin user: ${email}`)
}

process.exit(0)