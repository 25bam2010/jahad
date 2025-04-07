document.addEventListener('DOMContentLoaded', function() {
    const selectButton = document.getElementById('selectButton');
    const result = document.getElementById('result');
    const selectedNumbers = document.getElementById('selectedNumbers');

    selectButton.addEventListener('click', function() {
        // 1부터 30까지의 숫자 배열 생성
        const numbers = Array.from({length: 30}, (_, i) => i + 1);
        
        // Fisher-Yates 셔플 알고리즘을 사용하여 배열을 무작위로 섞기
        for (let i = numbers.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
        }

        // 처음 5개의 숫자 선택
        const selected = numbers.slice(0, 5).sort((a, b) => a - b);

        // 결과 표시
        selectedNumbers.textContent = selected.join('번, ') + '번';
        result.classList.remove('d-none');

        // 버튼 비활성화 및 3초 후 다시 활성화
        selectButton.disabled = true;
        selectButton.textContent = '뽑는 중...';
        
        setTimeout(() => {
            selectButton.disabled = false;
            selectButton.textContent = '당번 뽑기';
        }, 3000);
    });
});
