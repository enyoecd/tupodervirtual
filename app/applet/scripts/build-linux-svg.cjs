const fs = require("fs");
let tuxSvg = fs.readFileSync("/tmp/tux.svg", "utf8");
const innerTux = tuxSvg.replace(/<\?xml[^>]*\?>/g, "")
  .replace(/<!DOCTYPE[^>]*>/g, "")
  .replace(/<svg[^>]*>/, "")
  .replace(/<\/svg>/, "");

const combined = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 215 64" width="215" height="64">
  <!-- Tux Penguin Icon -->
  <g transform="translate(0, 0) scale(0.25)">
    ${innerTux}
  </g>
  <!-- Linux Serif Wordmark -->
  <text x="64" y="47" font-family="'Times New Roman', 'Georgia', serif" font-weight="700" font-size="50" fill="#000000" letter-spacing="1px">Linux</text>
</svg>`;

fs.writeFileSync("/app/applet/src/assets/linux.svg", combined);
console.log("Created linux.svg successfully, size:", combined.length);
