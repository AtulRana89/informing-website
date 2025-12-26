import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PublicHeader from '../components/PublicHeader';
import PublicFooter from '../components/PublicFooter';

interface Video {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  duration: string;
  date: string;
}

const ISIVideosPage: React.FC = () => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);

  const videos: Video[] = [
    {
      id: '1',
      title: 'InSITE 2025 Conference Highlights',
      description: 'Key highlights and presentations from the InSITE 2025 conference held in Hiroshima, Japan.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=225&fit=crop&crop=center',
      duration: '15:30',
      date: '2025-01-15'
    },
    {
      id: '2',
      title: 'Introduction to Informing Science',
      description: 'A comprehensive introduction to the field of Informing Science and its applications.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop&crop=center',
      duration: '22:45',
      date: '2025-01-10'
    },
    {
      id: '3',
      title: 'Interview with Dr. Eli Cohen',
      description: 'Exclusive interview with Dr. Eli Cohen, Senior Editor in Chief of Informing Science Journal.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=225&fit=crop&crop=center',
      duration: '18:20',
      date: '2025-01-08'
    },
    {
      id: '4',
      title: 'Research Methodology Workshop',
      description: 'Learn about effective research methodologies in the field of Informing Science.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=225&fit=crop&crop=center',
      duration: '45:15',
      date: '2025-01-05'
    },
    {
      id: '5',
      title: 'Publishing Your Research',
      description: 'Guidelines and best practices for publishing research in ISI journals.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=225&fit=crop&crop=center',
      duration: '28:30',
      date: '2025-01-03'
    },
    {
      id: '6',
      title: 'InSITE 2024 Virtual Conference',
      description: 'Complete coverage of the InSITE 2024 virtual conference presentations.',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
      thumbnail: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=400&h=225&fit=crop&crop=center',
      duration: '120:00',
      date: '2024-12-20'
    }
  ];

  const handleVideoClick = (videoId: string) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId);
  };

  return (
    <div className="min-h-screen bg-white font-['Roboto']">
      <PublicHeader />

      <main className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-[1460px]  w-[90%]  mx-auto md:pb-10">
          {/* Breadcrumbs */}
          <div className="text-xs text-gray-500 mb-6">
            <Link to="/" className="hover:underline">Home</Link> 
            <span className="mx-1">›</span> ISI Videos
          </div>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-4">
              <span className="inline-block w-[4px] h-[10px] rounded-full mr-3 align-middle" style={{ backgroundColor: '#295F9A' }}></span>
              ISI Videos
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              Explore our collection of educational videos, conference presentations, tutorials, and interviews from the Informing Science Institute.
            </p>
          </div>


          {/* Videos Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                {/* Video Player */}
                <div className="relative">
                  {playingVideo === video.id ? (
                    <video 
                      className="w-full h-48 object-cover"
                      controls
                      autoPlay
                      onEnded={() => setPlayingVideo(null)}
                    >
                      <source src={video.videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <div 
                      className="relative w-full h-48 cursor-pointer group"
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <img 
                        src={video.thumbnail} 
                        alt={video.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                        <div className="text-center">
                          <div className="w-16 h-16 bg-[#295F9A] rounded-full flex items-center justify-center mb-2 mx-auto hover:bg-[#1e4a7a] transition-colors shadow-lg">
                            <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z"/>
                            </svg>
                          </div>
                          <p className="text-xs text-white font-medium">Click to Play</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Video Content */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {video.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{new Date(video.date).toLocaleDateString()}</span>
                    <button 
                      onClick={() => handleVideoClick(video.id)}
                      className="text-[#295F9A] hover:underline font-medium"
                    >
                      {playingVideo === video.id ? 'Playing...' : 'Watch Now →'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-8">
            <button className="px-8 py-3 bg-[#295F9A] text-white rounded-lg hover:bg-[#1e4a7a] transition-colors font-medium">
              Load More Videos
            </button>
          </div>
        </div>
      </main>

      <PublicFooter />
    </div>
  );
};

export default ISIVideosPage;
