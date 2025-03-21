
/**
 * Fetches YouTube videos related to a location
 */
export async function getLocationVideos(location: string): Promise<any[]> {
  try {
    // This is a mock implementation since we don't have YouTube API keys
    // In a real application, you would use the YouTube Data API
    
    // Simulated response
    return [
      { 
        id: 'video1', 
        title: `Travel Guide: ${location}`, 
        thumbnail: 'https://via.placeholder.com/320x180.png?text=Travel+Guide', 
        url: 'https://youtube.com/watch?v=example1'
      },
      { 
        id: 'video2', 
        title: `Weather in ${location}`, 
        thumbnail: 'https://via.placeholder.com/320x180.png?text=Weather+Video', 
        url: 'https://youtube.com/watch?v=example2'
      },
      { 
        id: 'video3', 
        title: `Exploring ${location}`, 
        thumbnail: 'https://via.placeholder.com/320x180.png?text=Exploring', 
        url: 'https://youtube.com/watch?v=example3'
      }
    ];
  } catch (error) {
    console.error('Error fetching location videos:', error);
    return [];
  }
}

/**
 * Returns Google Maps URL for a location
 */
export function getGoogleMapsUrl(location: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

/**
 * Get a static map image for a location (mock implementation)
 */
export function getStaticMapUrl(location: string, width = 600, height = 300): string {
  // In a real app, you would use a Maps API like Google Maps or Mapbox
  return `https://via.placeholder.com/${width}x${height}.png?text=Map+of+${encodeURIComponent(location)}`;
}
