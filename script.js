// API 설정
window.onload = function() {
    getMeal();
};

function getMeal() {
    const date = getCurrentDate(); // 현재 날짜 가져오기
    const apiUrl = `https://open.neis.go.kr/hub/mealServiceDietInfo?ATPT_OFCDC_SC_CODE=J10&SD_SCHUL_CODE=7530051&MLSV_YMD=${date}&Type=json`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            try {
                // API 응답 확인
                if (data.RESULT && data.RESULT.CODE === 'INFO-200') {
                    document.getElementById('mealInfo').innerHTML = '<p class="no-menu">오늘은 급식 정보가 없습니다.</p>';
                    return;
                }
                
                // 급식 정보 파싱
                if (data.mealServiceDietInfo && data.mealServiceDietInfo[1] && data.mealServiceDietInfo[1].row) {
                    const mealInfo = data.mealServiceDietInfo[1].row[0].DDISH_NM;
                    
                    // 알레르기 정보 제거 및 메뉴 분리
                    const mealList = mealInfo
                        .split('<br/>')
                        .map(item => {
                            // 알레르기 정보 제거 (괄호 안의 내용)
                            const cleanItem = item.split('(')[0].trim();
                            // 느낌표 제거
                            return cleanItem.replace(/!+$/, '');
                        })
                        .filter(item => item.length > 0);
                    
                    // 메뉴 HTML 생성
                    let mealHTML = '<h2>오늘의 급식 메뉴</h2>';
                    mealHTML += '<ul>';
                    mealList.forEach(meal => {
                        mealHTML += `<li>${meal}</li>`;
                    });
                    mealHTML += '</ul>';
                    
                    // 영양 정보 추가 (있는 경우)
                    if (data.mealServiceDietInfo[1].row[0].NTR_INFO) {
                        const nutritionInfo = data.mealServiceDietInfo[1].row[0].NTR_INFO;
                        mealHTML += '<div class="nutrition-info">';
                        mealHTML += '<h3>영양 정보</h3>';
                        mealHTML += `<p>${nutritionInfo}</p>`;
                        mealHTML += '</div>';
                    }
                    
                    document.getElementById('mealInfo').innerHTML = mealHTML;
                } else {
                    document.getElementById('mealInfo').innerHTML = '<p class="no-menu">급식 정보를 찾을 수 없습니다.</p>';
                }
            } catch (error) {
                console.error('급식 정보 파싱 중 오류 발생:', error);
                document.getElementById('mealInfo').innerHTML = '<p class="no-menu">급식 정보를 처리하는 중 오류가 발생했습니다.</p>';
            }
        })
        .catch(error => {
            console.error('Error fetching meal data:', error);
            document.getElementById('mealInfo').innerHTML = '<p class="no-menu">급식 정보를 가져오는 중 오류가 발생했습니다.</p>';
        });
}

function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    // 월과 일이 한 자리 수인 경우 앞에 0을 추가
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;

    return `${year}${month}${day}`;
}