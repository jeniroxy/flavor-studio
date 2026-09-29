/* Extract only the Icon Park icons this site uses into a small local subset,
   so the client never ships the full 3k-icon collection or hits the CDN. */
const fs = require("fs");
const path = require("path");

const NAMES =
  `all-application arrow-right pause attention box branch-one calculator-one calendar-three
caution chart-histogram check-one chef-hat-one click cloud-storage degree-hat doc-detail doc-search
experiment factory-building folder-open funds hamburger headset-one home income key-one knife-fork
leaves left lightning local-two lock mail mouse peoples phone-telephone protect quote right
search send setting-two star mouth weight checklist time history
form-one api shield robot brain magic-wand tag-one order plug link grid-nine list-two pie-one
bar-code fork-spoon bowl cup milk noodles down up close play sun translate globe earth refresh
sort filter like check close-one minus plus arrow-down down-one up-one percentage formula flag
inbox message comment book notebook newspaper-folding bookmark alarm-clock timer stopwatch
dashboard-one analysis chart-line chart-pie chart-proportion table-file layers copy edit
file-pdf-one file-text download upload printer target certificate audit truck delivery
shopping-bag wallet coupon bank-card user user-business people-plus waterfalls-v block-one
components layout-four data-sheet excel-one microscope test-tube scale-one measuring-cup
config tool arrow-left more hamburger-button application-two menu-fold-one
pic fingerprint tree-diagram timeline table-report id-card file-code api-app file-excel file-word
drag layout-one tree export share ranking thumbs-up agreement category-management code view-list
dollar trending-up history-query calendar-dot chart-graph contrast distribute-horizontally`
    .split(/\s+/)
    .filter(Boolean);

const full = require("@iconify-json/icon-park-outline/icons.json");

const icons = {};
const missing = [];
for (const name of NAMES) {
  if (full.icons[name]) icons[name] = full.icons[name];
  else missing.push(name);
}

const subset = {
  prefix: full.prefix,
  icons,
  width: full.width,
  height: full.height,
};
const out = path.join(process.argv[2], "icon-park-subset.json");
fs.writeFileSync(out, JSON.stringify(subset));
console.log(
  `wrote ${Object.keys(icons).length}/${NAMES.length} icons -> ${out}`,
);
if (missing.length) console.log("MISSING:", missing.join(", "));
