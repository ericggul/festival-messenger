declare global {
  interface Window {
    Kakao: any;
  }
}

export function initializeKakao() {
  window.Kakao.init("167d7848a20572ea0a176a7653113c36");
  window.Kakao.isInitialized();
}
