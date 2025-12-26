import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import AdminLayout from './components/AdminLayout';
import UserManagement from './components/admin/UserManagement';
import JournalConferenceManagement from './components/admin/JournalConferenceManagement';
import ContentManagement from './components/admin/ContentManagement';
import EmailTemplateManagement from './components/admin/EmailTemplateManagement';
import SystemConfiguration from './components/admin/SystemConfiguration';
import AnalyticsReports from './components/admin/AnalyticsReports';
import DataBackupExport from './components/admin/DataBackupExport';
import Profile from './components/Profile';
import Publications from './components/Publications';
import Community from './components/Community';

import Login from './components/Login';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import CallForPapersPage from './pages/CallForPapersPage';
import PublicationsPage from './pages/PublicationsPage';
import JournalsPage from './pages/JournalsPage';
import ConferencesPage from './pages/ConferencesPage';
import CommunityPage from './pages/CommunityPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import ISIVideosPage from './pages/ISIVideosPage';
import MentorshipPage from './pages/MentorshipPage';
import SecondActPage from './pages/SecondActPage';
import SponsorUsPage from './pages/SponsorUsPage';
import AdvertisePage from './pages/AdvertisePage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import EthicsPolicyPage from './pages/EthicsPolicyPage';
import LegalDisclaimerPage from './pages/LegalDisclaimerPage';
import SiteMapPage from './pages/SiteMapPage';
import JoinISIPage from './pages/JoinISIPage';
import ProfileEditPage from './pages/ProfileEditPage';
import MemberDashboardPage from './pages/MemberDashboardPage';
import YourArticlesPage from './pages/YourArticlesPage';
import YourReviewsPage from './pages/YourReviewsPage';
import NotificationsPage from './pages/NotificationsPage';
import PeerDirectoryPage from './pages/PeerDirectoryPage';
import MemberConferencesPage from './pages/MemberConferencesPage';
import MembershipOptionsPage from './pages/MembershipOptionsPage';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/call-for-papers" element={<CallForPapersPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/journals" element={<JournalsPage />} />
          <Route path="/conferences" element={<ConferencesPage />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/isi-videos" element={<ISIVideosPage />} />
          <Route path="/mentorship" element={<MentorshipPage />} />
          <Route path="/second-act" element={<SecondActPage />} />
          <Route path="/sponsor-us" element={<SponsorUsPage />} />
          <Route path="/advertise" element={<AdvertisePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/ethics-policy" element={<EthicsPolicyPage />} />
          <Route path="/legal-disclaimer" element={<LegalDisclaimerPage />} />
          <Route path="/site-map" element={<SiteMapPage />} />
          <Route path="/join-isi" element={<JoinISIPage />} />
          
          {/* Admin routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Member routes */}
          <Route path="/profile-edit" element={<ProfileEditPage />} />
          <Route path="/member/dashboard" element={<MemberDashboardPage />} />
          <Route path="/member/articles" element={<YourArticlesPage />} />
          <Route path="/member/reviews" element={<YourReviewsPage />} />
          <Route path="/member/notifications" element={<NotificationsPage />} />
          <Route path="/member/peer-directory" element={<PeerDirectoryPage />} />
          <Route path="/member/conferences" element={<MemberConferencesPage />} />
          <Route path="/member/membership-options" element={<MembershipOptionsPage />} />
          
          {/* Admin dashboard routes */}
          <Route path="/admin-dashboard" element={
            <ProtectedRoute requiredRoles={['admin', 'super-admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="journals" element={<JournalConferenceManagement />} />
            <Route path="content" element={<ContentManagement />} />
            <Route path="email-templates" element={<EmailTemplateManagement />} />
            <Route path="system-config" element={<SystemConfiguration />} />
            <Route path="analytics" element={<AnalyticsReports />} />
            <Route path="backup" element={<DataBackupExport />} />
          </Route>
          
          {/* Protected routes with main layout */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="publications" element={<Publications />} />
            <Route path="community" element={<Community />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;