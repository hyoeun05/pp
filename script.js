// 1. Google Cloud Console에서 발급받은 YouTube API Key를 입력하세요. (기존 키 그대로 사용)
const YOUTUBE_API_KEY = '이곳에_API_키를_입력하세요'; 

// 2. 영상 ID들을 쉼표(,)로 구분해서 모두 적어줍니다.
const VIDEO_IDS = 'JHpMIOUBFhk,jRb2p_JA7Qg'; 

async function getYouTubeStats() {
    try {
        // 여러 영상의 통계를 한 번에 가져오는 주소
        const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${VIDEO_IDS}&key=${YOUTUBE_API_KEY}`);
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
            // 가져온 각 영상의 데이터를 반복하면서 화면에 뿌려줍니다.
            data.items.forEach(item => {
                const stats = item.statistics;
                const viewCount = Number(stats.viewCount).toLocaleString(); 
                const likeCount = Number(stats.likeCount).toLocaleString();
                
                // 각 영상 ID에 맞는 HTML 위치(div)를 찾아서 데이터 입력
                const statsContainer = document.getElementById(`youtube-stats-${item.id}`);
                if (statsContainer) {
                    statsContainer.innerHTML = `
                        <span>👀 조회수: ${viewCount}회</span>
                        <span>❤️ 좋아요: ${likeCount}개</span>
                    `;
                }
            });
        }
    } catch (error) {
        console.error('유튜브 데이터를 불러오는 중 오류가 발생했습니다:', error);
    }
}

// 페이지가 로드될 때 함수 실행
document.addEventListener('DOMContentLoaded', getYouTubeStats);