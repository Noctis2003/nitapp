# Noctis - College Hub Platform 🌙

A modern, full-stack college social platform built with Next.js and NestJS, designed to bring students together through collaboration, community discussions, marketplace, and anonymous confessions.

## 🎯 Features

### 🤝 Collaboration Hub
- **Project Collaboration**: Create and join live missions/projects
- **Role-based Applications**: Apply for specific roles in collaborations
- **Real-time Project Management**: Track project progress and team members

### 💬 Community Forum
- **Discussion Threads**: Create and participate in community discussions
- **Interactive Comments**: Engage with posts through comments and likes
- **Real-time Updates**: Stay updated with the latest community discussions

### 🛍️ Marketplace
- **Buy & Sell**: Student marketplace for books, electronics, and more
- **Image Upload**: Upload product images with Cloudinary integration
- **Search & Filter**: Easy discovery of products and services

### 🧻 Anonymous Confessions
- **Gossip Wall**: Share anonymous thoughts and secrets
- **Carousel Navigation**: Browse confessions with keyboard/swipe controls
- **Real-time Updates**: See new confessions as they're posted

### 👤 User Profiles
- **Dashboard**: Comprehensive view of user activities
- **Content Management**: Manage your posts, ads, collaborations, and applications
- **Activity Tracking**: View your contribution history

## 🚀 Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **React Hook Form** - Form validation and management
- **Zod** - Schema validation
- **NextAuth.js** - Authentication with Google OAuth

### Backend Integration
- **Axios** - HTTP client for API communication
- **Cookie-based Authentication** - Secure session management
- **RESTful APIs** - Clean API architecture

### UI/UX
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Modern dark UI with gray-950 background
- **Custom Components** - Reusable UI components
- **Loading States** - Elegant loading animations
- **Touch Gestures** - Mobile-friendly interactions

### Cloud Services
- **Cloudinary** - Image upload and management
- **Render** - Backend hosting

## 📁 Project Structure

```
nitapp/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── auth/              # Authentication pages
│   │   │   └── sync/          # OAuth synchronization
│   │   ├── featured/          # Main application features
│   │   │   ├── collab/        # Collaboration hub
│   │   │   ├── forum/         # Community forums
│   │   │   ├── confessions/   # Anonymous confessions
│   │   │   ├── sell/          # Marketplace
│   │   │   └── profile/       # User profiles
│   │   ├── api/               # API routes
│   │   ├── layout.tsx         # Root layout
│   │   ├── loading.tsx        # Global loading component
│   │   └── page.tsx           # Landing page
│   ├── components/            # Reusable components
│   │   ├── ui/               # UI components
│   │   ├── GigCard.tsx       # Collaboration cards
│   │   ├── ProductCard.tsx   # Marketplace products
│   │   ├── Paperpost.tsx     # Forum posts
│   │   └── ...
│   ├── lib/                  # Utility libraries
│   │   ├── axios.ts          # API configuration
│   │   ├── cloudinary.ts     # Image upload
│   │   └── utils.ts          # Helper functions
│   ├── store/                # State management
│   └── styles/               # Global styles
├── public/                   # Static assets
│   └── Icons/               # Application icons
├── types/                   # TypeScript definitions
└── config files            # Next.js, Tailwind, ESLint configs
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm/yarn/pnpm
- Git

### 1. Clone the Repository
```bash
git clone https://github.com/Noctis2003/nitapp.git
cd nitapp
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Backend API
NEXT_PUBLIC_API_URL=https://nitappbackend.onrender.com

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# NextAuth
NEXTAUTH_SECRET=your_nextauth_secret

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 4. Run Development Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🚀 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Configuration

### API Integration
The app integrates with a NestJS backend. Update the `NEXT_PUBLIC_API_URL` in your `.env` file to point to your backend instance.

### Authentication
Google OAuth is configured for user authentication. Users are automatically registered/logged in through the sync page.

### Image Uploads
Cloudinary is used for image management. Configure your Cloudinary credentials in the environment variables.

## 📱 Features Overview

### Landing Page
- Animated background with moving lines
- Google OAuth integration
- Responsive design with gradient text effects

### Collaboration Hub
- Browse live missions and projects
- Create new collaboration projects
- Apply for specific roles
- Track application status

### Forum
- Create discussion threads
- Comment and like system
- Responsive post layout
- Real-time updates

### Marketplace
- Upload products with images
- Browse and search items
- Contact sellers directly
- Manage your listings

### Confessions Wall
- Anonymous posting system
- Carousel-style browsing
- Keyboard/touch navigation
- Graffiti-style background animations

### User Profile
- Comprehensive dashboard
- Manage all user content
- View statistics and activity
- Delete/edit functionality

## 🎨 Design System

### Color Palette
- **Background**: `bg-gray-950` (Almost black)
- **Cards**: `bg-gray-900` (Dark gray)
- **Accents**: Blue, Purple, Cyan, Green variants
- **Text**: White with gray variants for secondary text

### Typography
- **Primary Font**: Poppins (Google Fonts)
- **Secondary Font**: Shadows Into Light (for confessions)
- **Responsive Sizes**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints

### Components
- **Responsive Design**: Mobile-first approach
- **Loading States**: Custom animated spinners
- **Interactive Elements**: Hover effects and transitions
- **Form Validation**: Real-time validation with error messages

## 🔒 Security Features

- **Cookie-based Authentication**: Secure session management
- **CSRF Protection**: Built-in Next.js protection
- **Input Validation**: Zod schema validation
- **Secure API Calls**: Credential-included requests

## 🌐 Deployment

### Frontend (Vercel - Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Backend Requirements
- Ensure your NestJS backend is deployed and accessible
- Update `NEXT_PUBLIC_API_URL` to your production backend URL
- Configure CORS to allow your frontend domain

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is built for educational purposes. Feel free to use it as a reference for your own projects.

## 🙏 Acknowledgments

- Built with ❤️ and lots of ☕
- Inspired by the need for better college community platforms
- Thanks to all the open-source libraries that made this possible

## 📞 Support

If you have any questions or need help with setup, please open an issue in the repository.

---

**Made with 💙 by Noctis**
