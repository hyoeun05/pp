// 1. Google Cloud Console에서 발급받은 YouTube API Key를 입력하세요.
const YOUTUBE_API_KEY = '이곳에_API_키를_입력하세요'; 

// 2. 데이터를 가져올 유튜브 영상의 ID를 입력하세요. 
// 예: https://youtu.be/dQw4w9WgXcQ 라면 ID는 dQw4w9WgXcQ 입니다.
const VIDEO_ID = 'YOUR_VIDEO_ID'; 

async function getYouTubeStats() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_ID}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            const stats = data.items[0].statistics;
            const viewCount = Number(stats.viewCount).toLocaleString(); // 천 단위 콤마
            const likeCount = Number(stats.likeCount).toLocaleString();
            
            // HTML에 데이터 업데이트
            const statsContainer = document.getElementById('youtube-stats-1');
            statsContainer.innerHTML = `
                <span>👀 조회수: ${viewCount}회</span>
                <span>❤️ 좋아요: ${likeCount}개</span>
            `;
        }
    } catch (error) {
        console.error('유튜브 데이터를 불러오는 중 오류가 발생했습니다:', error);
        document.getElementById('youtube-stats-1').innerHTML = '<span>데이터를 불러올 수 없습니다.</span>';
    }
}

// 페이지가 로드될 때 함수 실행
document.addEventListener('DOMContentLoaded', getYouTubeStats);