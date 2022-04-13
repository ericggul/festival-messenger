declare global {
  interface Window {
    Kakao: any;
  }
}

export function initializeKakao() {
  // window.Kakao.init("167d7848a20572ea0a176a7653113c36");
  window.Kakao.init("4f86345a0b4bb1d093ca4ae9ad9cb022");
  window.Kakao.isInitialized();
}
