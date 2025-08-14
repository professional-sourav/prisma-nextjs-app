import { PrismaClient } from '@/generated/prisma'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting seed...')

    // Clear existing data (optional)
    await prisma.user.deleteMany()
    console.log('🗑️ Cleared existing users')

    // Create sample users
    const users = [
        {
            email: 'admin@example.com',
            name: 'Admin User',
            password: 'admin123', // In production, hash this password!
        },
        {
            email: 'john@example.com',
            name: 'John Doe',
            password: 'password123',
        },
        {
            email: 'jane@example.com',
            name: 'Jane Smith',
            password: 'password123',
        },
        {
            email: 'bob@example.com',
            name: 'Bob Johnson',
            password: 'password123',
        },
        {
            email: 'alice@example.com',
            name: 'Alice Williams',
            password: 'password123',
        },
    ]

    console.log('👥 Creating users...')

    for (const userData of users) {
        const user = await prisma.user.create({
            data: userData,
        })
        console.log(`✅ Created user: ${user.email}`)
    }

    console.log('🎉 Seed completed successfully!')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })