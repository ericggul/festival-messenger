export const params = {
  amplitude: 1.0,
  waves: 30.0,
  colorSeparation: 0.3,
};

export const glsl = `
  // uniform float amplitude; // = 1.0
  // uniform float waves; // = 30.0
  // uniform float colorSeparation; // = 0.3

  float amplitude = 1.0;
  float waves = 30.0;
  float colorSeparation = 0.3;
  
  float PI = 3.14159265358979323846264;
  float compute(vec2 p, float progress, vec2 center) {
    vec2 o = p*sin(progress * amplitude)-center;
    // horizontal vector
    vec2 h = vec2(1., 0.);
    // butterfly polar function (don't ask me why this one :))
    float theta = acos(dot(o, h)) * waves;
    return (exp(cos(theta)) - 2.*cos(4.*theta) + pow(sin((2.*theta - PI) / 24.), 5.)) / 10.;
  }
  vec4 transition(vec2 uv) {
    vec2 p = uv.xy / vec2(1.0).xy;
    float inv = 1. - progress;
    vec2 dir = p - vec2(.5);
    float dist = length(dir);
    float disp = compute(p, progress, vec2(0.5, 0.5));
    vec4 texTo = getToColor(p + inv*disp);
    vec4 texFrom = vec4(
    1.0, 1.0, 1.0,
   0.0);
    return texTo*progress + texFrom*inv;
  }
`;