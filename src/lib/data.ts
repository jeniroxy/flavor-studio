import { productAssets, type AssetSpec } from "@/lib/assets";
import { flows } from "@/lib/flows";
import type { Flow } from "@/components/flow-player";
import { routes } from "@/lib/routes";

/*
 * Content ported from the prototypes. The customer, testimonial and success
 * story material is the real flavorstudio.com copy the user asked for; the
 * accompanying imagery is served locally (see public/) rather than hot-linked.
 */

/* ---------------------------------------------------------------- customers */

/*
 * The eight marks from the flavorstudio.com customer strip, vendored from
 * /gfx/senspire/customers/. They ship greyscale already, so the marquee tint
 * only has to cool them toward the page's slate-blue.
 *
 * Aspect ratios vary a lot (sensient is 3.8:1, imagine-food is 1.2:1), so each
 * entry carries its intrinsic size and the marquee bounds both axes instead of
 * pinning height alone -- see logo-marquee.tsx.
 */
export const customerLogos = [
  { name: "Pulse Canada", src: "/customers/pulse-canada.png", w: 350, h: 79 },
  { name: "Pinnacle", src: "/customers/pinnacle.png", w: 336, h: 109 },
  { name: "Imagine Food", src: "/customers/imagine-food.png", w: 129, h: 110 },
  {
    name: "Made in Nature",
    src: "/customers/made-in-nature.png",
    w: 161,
    h: 102,
  },
  { name: "Sensient", src: "/customers/sensient.png", w: 229, h: 60 },
  { name: "Luvo", src: "/customers/luvo.png", w: 280, h: 150 },
  { name: "Clearwater", src: "/customers/clearwater.png", w: 400, h: 184 },
  { name: "JMH", src: "/customers/jmh.png", w: 350, h: 191 },
];

/* ------------------------------------------------------------ testimonials */

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo: string;
};

export const testimonials: Testimonial[] = [
  {
    quote: '"This is bar none the best program I’ve ever seen or worked with."',
    name: "Andrew Hunter",
    role: "President at Chef Andrew Hunter",
    photo: "/testimonials/andrew_hunter.png",
  },
  {
    quote:
      '"Today we communicate, collaborate and prioritize projects in an organized and highly visible fashion… We can not live without Flavor Studio!"',
    name: "Charles Hayes",
    role: "VP Culinary Innovation, R&D Deli Star",
    photo: "/testimonials/charles_hayes.png",
  },
  {
    quote:
      '"Flavor Studio has always provided unparalleled customer service and has been extremely patient in working with us…"',
    name: "Stefan Czapalay",
    role: "CEO Signature Culinary Solutions",
    photo: "/testimonials/stefan_czapalay.png",
  },
  {
    quote:
      '"It’s a great organizing tool and keeps you on task — like an Outlook calendar for food."',
    name: "Greg Grisanti",
    role: "Director of R&D at Frischs Big Boy Inc.",
    photo: "/testimonials/greg_grisanti.png",
  },
  {
    quote: '"We are loving Flavor Studio more than ever!"',
    name: "Kari Baker",
    role: "Product Developer at Hope Foods",
    photo: "/testimonials/kari_baker.png",
  },
  {
    quote:
      '"…a very robust and full-featured software for ideation and product formulation."',
    name: "Michael Cheng, PhD., CHE",
    role: "Director of Food and Beverage Program at FIU",
    photo: "/testimonials/michael_cheng.png",
  },
  {
    quote:
      '"Flavor Studio has provided ATE with not only a valuable business tool… but a proactive, solution driven relationship."',
    name: "Chef Rob Corliss",
    role: "Owner of ATE (All Things Epicurean)",
    photo: "/testimonials/chef_rob_corliss.png",
  },
];

/* ---------------------------------------------------------- success stories */

/*
 * Photography and logos are vendored from flavorstudio.com/success-stories.
 * The three heroes are not a common shape (Deli Star is 3:2, the other two are
 * square) and the logos range from 7.6:1 to 1.8:1, so each carries its own
 * intrinsic size: the heroes crop to a 4:3 slot via object-cover, and the logo
 * chips size off a real aspect ratio instead of a shared guess.
 */
export type Story = {
  company: string;
  /** URL segment for the on-site detail page: /success-stories/<slug>. */
  slug: string;
  meta: string;
  eyebrow: string;
  title: string;
  blurb: string;
  img: string;
  imgW: number;
  imgH: number;
  imgAlt: string;
  logo: string;
  logoW: number;
  logoH: number;
  /** On-site detail page. The old external flavorstudio.com links are gone —
      the client flagged that these used to redirect to the legacy site. */
  href: string;
  /**
   * The full case-study narrative, ported from the legacy story pages.
   * Sections render in order; `quote` is optional pull-quote material.
   * Empty `sections` = the detail page shows a marked "content being ported"
   * state rather than invented copy.
   */
  detail: {
    sections: { heading: string; paragraphs: string[] }[];
    quote?: { text: string; name: string; role: string };
  };
  /**
   * The case study as the legacy story page tells it, verbatim (headings,
   * paragraphs, the RESULTS figures and the pull-quotes), ported from
   * flavorstudio.com/success-stories/<slug>-success-story on 2026-10-01.
   * A quote with a name is a person speaking; one without is the page's own
   * highlight of a line from the body.
   */
  legacy?: {
    results: { value: string; label: string }[];
    blocks: (
      | {
          kind: "section";
          level: 2 | 3;
          label?: string;
          heading: string;
          paragraphs: string[];
        }
      | { kind: "quote"; text: string; name?: string; role?: string }
    )[];
    /** A second photo from the legacy page, for the body. */
    photo?: { src: string; w: number; h: number; alt: string };
  };
};

export const stories: Story[] = [
  {
    company: "Deli Star",
    slug: "deli-star",
    meta: "Fayetteville, Illinois · Meat processing",
    eyebrow: "Meat processing · Innovation",
    title:
      "Flavor Studio drives innovation and collaboration to accelerate product launches",
    blurb:
      "Deli Star is a meat processing company built on scientific innovation, food safety and family culture — crafting healthy, flavorful, minimally processed products in the belief that food is fuel.",
    img: "/stories/deli-star.jpg",
    imgW: 1001,
    imgH: 667,
    imgAlt: "Deli Star headquarters sign",
    logo: "/stories/deli-star-logo.png",
    logoW: 160,
    logoH: 21,
    href: "/success-stories/deli-star",
    legacy: {
      results: [
        {
          value: "30%",
          label: "Reduction in development time",
        },
      ],
      blocks: [
        {
          kind: "section",
          level: 2,
          heading: "Innovation is key",
          paragraphs: [
            "Deli Star is a meat processing company rooted in a passion for scientific innovation, food safety, and family culture. They pride themselves in crafting products that are healthy, flavorful, and minimally processed because they believe that food is fuel.",
            "To Deli Star, innovation is not just a buzz word—it is one of their core tenets. They believe innovation is rooted in education, so they created Deli Star University for employees and partners. They recently opened the Food Discovery Center, the first facility of its kind to house food science, venture capital, nutrition, education, R&D, and food manufacturing scale-up under one roof. This powerful combination sparks collaboration while leveraging internal and external capabilities.",
            "Deli Star’s constant dedication to the health and safety of their customers differentiates them as leader in the industry. This commitment to food safety is exemplified with its innovative Steam Post-Pasteurization that achieves efficiency and quality from concept to customer.",
            "Thirty-four years of innovation and protein manufacturing brings value to their customers with time-tested science. Founder, Dan Siegel, built Deli Star from the ground-up and, in doing so, forever changed the direction of the meat processing and packaging industry.",
          ],
          label: "Background",
        },
        {
          kind: "section",
          level: 2,
          heading: "Here, there, everywhere – a tale of disparate systems",
          paragraphs: [
            "Deli Star was utilizing MS project with no other dedicated tools to handle their product development efforts. In addition, they were running their business using various spreadsheets and emails. They acknowledged they lacked a project management system to organize and execute their PLM efforts.",
            "Deli Star was looking to centralize their PLM into one solution and move away from multiple, disparate systems. They wanted increased visibility and transparency for both sales and R&D as well as foster remote collaboration in response to the pandemic.",
          ],
          label: "Challenge",
        },
        {
          kind: "quote",
          text: "Flavor Studio has everything you need to run a business in one spot. The tools within the program are robust – project timelines, tasks, approval, CRM opportunities and pipeline. One can view the state of your business when the team embraces all the tools at their disposal.",
          name: "Charles Hayes",
          role: "Deli Star’s VP of Culinary Innovation",
        },
        {
          kind: "section",
          level: 2,
          heading: "Comprehensive, all-in-one suite",
          paragraphs: [
            "Charles Hayes, the VP of Culinary Innovation at Deli Star, had experience with Flavor Studio in his previous role at another food ingredient company. Flavor Studio combined new product ideation, recipe formulation and costing, nutritional analysis, FDA compliant label creation, consumer research surveys, project management, customer relationship management, taste tests, and other tools that Deli Star needed into one user-friendly, cloud-based interface.",
            "As the only solution of its kind to combine an entire suite of PLM tools, Flavor Studio facilitates cloud-based collaboration, eliminating disparate spreadsheets, and boosts internal and external communications.",
            "With such a comprehensive offering, Hayes knew that Flavor Studio would be the perfect PLM solution for Deli Star’s challenges and recommended that the company adopt it.",
          ],
          label: "Solution",
        },
        {
          kind: "quote",
          text: "It became apparent quickly that Flavor Studio created tremendously more value in product innovation, reporting, and marketing for Deli Star.",
        },
        {
          kind: "section",
          level: 2,
          heading: "Introducing new products faster",
          paragraphs: [
            "While the Deli Star team was initially attracted to the way Flavor Studio integrated all the tools needed to run their business into one cohesive interface, it became apparent quickly that the solution created tremendously more value in product innovation, reporting, and marketing.",
            "This is due to the fact that Deli Star uses all components of Flavor Studio and as a result the software changed the foundation of their product development process. Moving Deli Star’s disparate records from spreadsheets and email into Flavor Studio streamlined project management efforts and achieved cohesion and transparency throughout the company. With remote work during the pandemic, Deli Star found a way with Flavor Studio to facilitate greater collaboration while team members were physically apart. Flavor Studio also served as a cloud-based solution for Deli Star’s R&D and sales teams which allowed them to continue innovating and servicing their customers at peak performance.",
          ],
          label: "Results",
        },
        {
          kind: "section",
          level: 3,
          heading: "Product Innovation",
          paragraphs: [
            "Flavor Studio has helped Deli Star accelerate product innovation and time-to-market. The company gained the ability to communicate project statuses to teams in real time. And with increased collaboration, Deli Star observed development speed reduce by approximately 30%. Flavor Studio also serves as a central storage repository to houses images, product development details, and a library of products ready to be adapted, which cut time-to-market for new products. The Deli Star sales team loves these features because they can create relevant customer presentations quickly with the portfolio of items at their fingertips.",
          ],
        },
        {
          kind: "quote",
          text: "With Flavor Studio, Deli Star experienced a reduction in development speed by approximately 30%.",
        },
        {
          kind: "section",
          level: 3,
          heading: "Reporting",
          paragraphs: [
            "Crafting complex reports is painless with Flavor Studio’s rich reporting features. Deli Star makes use of the various analyses Flavor Studio offers including sales tracking, project pipeline, and project efficiency and has easy access to any custom reports within Flavor Studio that they may need. The ease of reporting has helped Deli Star’s management make rapid decisions and is especially helpful when tackling their seasonal business.",
          ],
        },
        {
          kind: "section",
          level: 3,
          heading: "Marketing",
          paragraphs: [
            "The use of Flavor Studio to track the effectiveness of sales and marketing efforts has been beneficial for Deli Star. Flavor Studio’s CRM and Taste Test features are key in helping the company recognize consumer needs. Hayes raves about the use of QR codes for taste tests and marvels at their ability to collect instant feedback from people tasting their products. Flavor Studio automatically analyzes this data so the R&D team can immediately pivot based on the results.",
            "Deli Star’s partners can also view data from sensory evaluations in real time in tandem with nutritional information using Flavor Studio’s Taste Test feature. This allows them to collaborate with, and provide feedback to, the Deli Star R&D team.",
          ],
        },
        {
          kind: "quote",
          text: "Utilizing Flavor Studio’s Taste Test feature, Deli Star is able to collect instant feedback from food testers and immediately analyze the data to quickly adapt to consumer needs.",
        },
      ],
      photo: {
        src: "/stories/deli-star-team.jpg",
        w: 1024,
        h: 576,
        alt: "The Deli Star team at work",
      },
    },
    detail: {
      // Full narrative to be ported from the legacy story page.
      sections: [],
      quote: {
        text: "Today we communicate, collaborate and prioritize projects in an organized and highly visible fashion… We can not live without Flavor Studio!",
        name: "Charles Hayes",
        role: "VP Culinary Innovation, R&D Deli Star",
      },
    },
  },
  {
    company: "Good Foods Group",
    slug: "good-foods",
    meta: "Pleasant Prairie, Wisconsin · Fresh produce",
    eyebrow: "Fresh produce · Family-owned",
    title: "Making good food from everywhere, with one shared source of truth",
    blurb:
      "From small-town Pleasant Prairie, Wisconsin, family-owned Good Foods turns fresh produce into guacamoles, dips, dressings, salsas and salads — convinced that good food makes the world go around.",
    img: "/stories/good-foods.jpg",
    imgW: 600,
    imgH: 600,
    imgAlt: "Good Foods products",
    logo: "/stories/good-foods-logo.png",
    logoW: 600,
    logoH: 337,
    href: "/success-stories/good-foods",
    legacy: {
      results: [
        {
          value: "100+",
          label: "Projects managed",
        },
        {
          value: "350+",
          label: "Taste tests conducted",
        },
      ],
      blocks: [
        {
          kind: "section",
          level: 2,
          heading: "Making Good Food From Everywhere",
          paragraphs: [
            "Good Foods is a family-owned business based out of small-town Pleasant Prairie, Wisconsin that transforms fresh produce into mouthwatering guacamoles, dips, dressings, salsas, and salads. The company believes that “good food makes the world go around,” and they contribute by processing fresh, healthy, and delicious foods.",
            "Good Foods pride themselves on using the freshest ingredients possible to create high quality products, even if it means sourcing food from across the world. Their second home in Tacámbaro, Michoacán, Mexico allows them to source 100% fresh, heart-healthy Hass avocados for their guacamoles. They go the extra mile to meet the farmers and visit their fields to ensure they partner with individuals with standards equal to their own.",
            "Their national distribution through retail partners allows them to strive toward their goal: a future with good foods available for everyone. And for customers unable to find their products locally, the store locator tool on their website can be used request Good Foods be carried.",
          ],
          label: "Background",
        },
        {
          kind: "section",
          level: 2,
          heading: "Longer and Safer Options",
          paragraphs: [
            "A desire to innovate inspires Good Foods to fuse culinary expertise with consumer research and food technology to create safe, high-quality foods that are full of flavor. The passion, drive, and entrepreneurial spirit fuel their innovative product development process, with in-house HPP at the forefront. HPP, high-pressure processing, is the technical procedure of immersing freshly produced products in a cold-water bath and applying high pressure. The process extends the shelf life of produce without added preservatives by eliminating spoilage organisms. Kurt Penn, the founder, and CEO of Good Foods, said that HPP is the future of food safety.",
            "Good Foods differentiates themselves from competitors by being vertically integrated from the avocado fields to owning their HPP equipment. This allows them to be in complete control of the manufacturing process and to ensure cold chain protection to prolong shelf-life.",
          ],
        },
        {
          kind: "quote",
          text: "Flavor Studio has become our one stop shop for all Good Foods product development. From recipe generation to taste tests, Flavor Studio has streamlined our R&D processes. We could not be happier with the software and support to date.",
          name: "Joe Schaber",
          role: "Product Development Manager",
        },
        {
          kind: "section",
          level: 2,
          heading: "Better Management Systems",
          paragraphs: [
            "Without a singular system in place and utilizing only spreadsheets, Good Foods had a slow process in launch their products into market. Good Foods aimed to improve their communication and create more innovative products faster by consolidating their PLM (Product Life Management) and taste tests.",
          ],
          label: "Objectives",
        },
        {
          kind: "section",
          level: 2,
          heading: "Adopting Flavor Studio",
          paragraphs: [
            "Senspire suggested adopting Flavor Studio to combine Good Foods’s new product ideation, recipe formulation and costing, nutritional label creation, nutrient analysis, consumer research surveys, project management, customer relationship management, taste tests, and other tools into one cloud-based interface. Since Good Foods vertically integration is a core tenant, tracking all parts of the NPD process is crucial to the cohesion of the entire company. Flavor Studio would consolidate the tools that were previously separated to facilitate ease of communication, product development, and CRM.",
            "The all-inclusive suite of PLM tools included in Flavor Studio provides everything needed to run a vertically integrated business. The software is unlike any other available; it allows for to facilitate cloud-based collaboration, taste testing, and CRM. Senspire’s world-class customer service is invaluable for a company like Good Foods that has unique needs.",
          ],
          label: "Solution",
        },
        {
          kind: "section",
          level: 3,
          heading: "Flavorful Impact",
          paragraphs: [
            'Flavor Studio walks Good Foods through the entirety of new product development. Starting on the bench, Good Foods enter their recipes into Flavor Studio and utilize the version tracking to understand the trajectory of a formula. Once they’re satisfied with a formula, they can conduct shelf-life testing to track a product’s sensory changes over time through Flavor Studio’s Taste Test tools. Automatically consolidating all this information into reports only takes a few clicks with Flavor Studio’s reporting abilities. This makes analyzing the results and success of a product efficient so Good Foods can certify that they’re formulating high-quality, healthy products that meet their standards. The full suite of PLM tools available in Flavor Studio lets Good Foods to streamline product development and time-to-market so their customers don’t have to wait for new, flavorful foods. <div id="',
          ],
        },
      ],
    },
    detail: {
      sections: [],
    },
  },
  {
    company: "Ripple Foods",
    slug: "ripple-foods",
    meta: "Berkeley, California · Plant-based",
    eyebrow: "Plant-based · Dairy-free",
    title:
      "An enhanced cloud-based experience with up-to-date, accurate nutritional analysis",
    blurb:
      "Founded in 2014, Ripple Foods makes plant-based, dairy-free foods and beverages from yellow peas — a milk with as much protein as dairy and about eight times the protein of almond milk.",
    img: "/stories/ripple-foods.webp",
    imgW: 1200,
    imgH: 1200,
    imgAlt: "Ripple Foods plant-based products",
    logo: "/stories/ripple-foods-logo.png",
    logoW: 260,
    logoH: 89,
    href: "/success-stories/ripple-foods",
    legacy: {
      results: [
        {
          value: "1000+",
          label: "Recipes stored in the cloud",
        },
      ],
      blocks: [
        {
          kind: "section",
          level: 2,
          heading: "Dairy-Free Done Right",
          paragraphs: [
            "Founded in 2014, Ripple Foods makes plant-based and dairy-free foods and beverages. The founders observed that other dairy alternatives were low in protein, then identified yellow peas as a way to provide substantial protein and great taste. Ripple’s plant-based milk contains just as much protein as dairy milk and about eight times the protein found in almond milk.",
            "Ripple doesn’t only produce plant-based milk. They’ve since expanded into product categories such as half and half, ice cream, and protein shakes. Their dedication to high-protein plant-based milk alternatives includes an awareness of environmental impacts.",
            "Ripple believes good food should be simple and should leave a small environmental footprint. To honor this commitment to the planet, all of their ingredients are non-GMO certified. The use of yellow peas results in about one hundred times less water consumption compared to almond milk.",
          ],
        },
        {
          kind: "section",
          level: 2,
          heading: "Overcoming Limitations: Lacking the Necessary Systems",
          paragraphs: [
            "Ripple Foods’ product development team used spreadsheets to track their formulations. These spreadsheets didn’t allow the team to factor in ingredient density values which impeded real-time nutritional insights. As a company whose platform centers around nutrition and protein content, this hindrance became more than a program inefficiency.",
            "They relied instead on a third party to generate their nutrition facts panels which slowed development and added cost. The team’s main issue was waiting for updated nutritional analyses. Ripple needed to bring this analysis in-house to accelerate their new product development timelines. They also wanted the formulas accessible to the entire team to ensure a single source of truth and eliminate the dependency on external partners.",
          ],
        },
        {
          kind: "section",
          level: 2,
          heading: "Cloud Communication Is Key",
          paragraphs: [
            "Ripple initially evaluated ESHA’s Genesis R&D as a possible solution but was discouraged to learn that the program wasn’t accessible to team members using Mac laptops without installing Microsoft Windows. ESHA’s alternative was their Cloud Services online portal but this required establishing a cumbersome remote desktop connections through a VPN. This method was not as refined as modern cloud-based software delivered through a browser on any computer.",
            "One of Ripple’s food scientists had used Flavor Studio at another company and requested a demonstration of the software’s features and capabilities to manage Ripple’s formulas and nutritional analysis needs.",
            "Ripple’s team was pleased to learn that Flavor Studio’s cloud-based software readily supported both Mac and Windows computers ensuring the same easy access to nutritional analysis for all users. And because Flavor Studio provides each user the ability to conduct nutritional analysis, it eliminates the constraint of having a single individual/computer as the gatekeeper to these insights.",
            "Flavor Studio proved to be much more for Ripple’s team than just a nutritional analysis tool. The Ripple team found an easy-to-use solution that tackled the complex density conversions needed for their beverages. They appreciated the ability to identify in-development recipes from finished production formulas that had moved to manufacturing.",
            "But most importantly, the cloud-based software provided a more efficient way to share formulas across the entire team. Flavor Studio’s robust search and filter capabilities made it a breeze to find a formula that used a specific ingredient or even to sort by ingredient categories.",
          ],
        },
        {
          kind: "section",
          level: 2,
          heading: "Consistent Results and a Growing Team",
          paragraphs: [
            "Over their five-year relationship with Flavor Studio, Ripple’s confidence in their product development process continues to improve. It is now effortless to send formulas to their contract manufacturer partners and share nutrition facts panel artwork with their designers; Flavor Studio allows Ripple to complete all these tasks internally. The version controls permit them to monitor revision history, which ensures consistency in their development process.",
            "Ripple’s product development team has more than tripled in size since it adopted Flavor Studio, but the software still allows them to collaborate with the protein research and development team. Their recipe library has also expanded to include over 400 versions of their production formulas, and Flavor Studio houses them all efficiently and intuitively. For Ripple, adopting Flavor Studio was an instrumental decision that has supported the company’s growth into new product categories.",
          ],
        },
        {
          kind: "quote",
          text: "Flavor Studio has completely changed the way our company goes through our R&D process. The cloud-based system has connected our company, keeping all our formulas up-to-date while providing the nutritional analysis that we were looking for. Flavor Studio’s ability to seamlessly scale as we grow merely reinforces the solution is exactly what our company needed.",
          name: "Andrew Cummings",
          role: "Ripple food scientist",
        },
      ],
    },
    detail: {
      sections: [],
    },
  },
];

/* ------------------------------------------------------ the platform (tabs) */

/*
 * The module tour on the landing page.
 *
 * Each tab used to carry a hand-drawn "mock" — a fake metric and three bar
 * charts — which is precisely what the client objected to: a visitor could not
 * see the product, only an illustration of it. Every tab now carries a real
 * screenshot of the module instead, and the six tabs were re-picked so that all
 * six can show one (Inspire and Admin keep their entries in the full catalogue
 * on the Features page).
 */

export type PlatformTab = {
  id: string;
  label: string;
  icon: string;
  title: string;
  desc: string;
  checks: string[];
  cta: string;
  href: string;
  /** The real screenshot of this module. */
  shot: AssetSpec;
  /** When the design file holds the feature as a sequence, play it instead. */
  flow?: Flow;
};

export const platformTabs: PlatformTab[] = [
  {
    id: "recipes",
    label: "Recipes",
    icon: "chef-hat-one",
    title: "Formulate and cost in one live grid",
    desc: "Percentages, weight, yield and cost recompute on every keystroke. Branch versions and nest sub-recipes without losing the original.",
    checks: [
      "Live yield, batch cost, container cost and retail price",
      "Named versions — V1, Testing, Final — switched from the header",
      "Sub-levels nested to any depth, costed through to the parent",
    ],
    cta: "Discover Recipes",
    href: `${routes.features}#recipes`,
    shot: productAssets.recipeCost,
  },
  {
    id: "labeling",
    label: "Labeling",
    icon: "doc-detail",
    title: "Publish a compliant label from the formula",
    desc: "Pick the content, the layout and the region, and the panel is generated from the recipe's own analysed values — print-ready, in the format your market requires.",
    checks: [
      "Vertical, tabular, side-by-side, linear, dual column and aggregate layouts",
      "Nutrition Panel or Supplement Facts, US or Canadian",
      "Ingredient statement, allergens and %Daily Values controlled per panel",
    ],
    cta: "Discover Labeling",
    href: `${routes.features}#labeling`,
    shot: productAssets.nutritionLabelFormats,
    flow: flows.publishAggregate,
  },
  {
    id: "designer",
    label: "Publish Designer",
    icon: "setting-two",
    title: "Design the documents that leave your building",
    desc: "A real layout canvas for spec sheets and published recipes. Drop in the elements you need, style them, save the template, and reuse it across products.",
    checks: [
      "Elements for recipe, procedure, label, allergens, composition and analytics",
      "Position, typography, layout and box-style inspector",
      "Named templates, headers and footers, print or publish",
    ],
    cta: "Discover Publish Designer",
    href: `${routes.features}#designer`,
    shot: productAssets.labelDesigner,
  },
  {
    id: "taste-tests",
    label: "Taste Tests",
    icon: "experiment",
    title: "Sensory data that flows back into the formula",
    desc: "Run internal panels or consumer surveys, score attributes side by side across versions, and let the winner carry its data into production.",
    // The export we have is the report-publishing step, so the checks describe
    // that step rather than claiming scores the frame does not show.
    checks: [
      "Summary, comprehensive and shelf-life reports",
      "Filtered by product version and by taster",
      "Print, or download as PDF",
    ],
    cta: "Discover Taste Tests",
    href: `${routes.features}#taste-tests`,
    shot: productAssets.tasteTests,
    flow: flows.tasteTestPublish,
  },
  {
    id: "timesheet",
    label: "Projects & time",
    icon: "time",
    title: "Development time, logged against the project",
    desc: "Stage-gated projects with a timeline and a board — plus a timesheet, so the hours and expenses a launch actually consumed are a number rather than a guess.",
    checks: [
      "Weekly and day views, running timer or manual entry",
      "Activity typed, logged to a project, with expenses attached",
      "Detailed and weekly reports, filterable and exportable",
    ],
    cta: "Discover Projects",
    href: `${routes.features}#timesheet`,
    shot: productAssets.timesheetWeek,
    flow: flows.timesheet,
  },
  {
    id: "crm",
    label: "CRM",
    icon: "peoples",
    title: "Connect the front line to R&D",
    desc: "Customers, opportunities, contracts and purchase orders in the same system as the development work — including a builder for the requirements forms your customers send you.",
    checks: [
      "Opportunities linked to the development project",
      "Customer Requirements Builder — sections, question types, nested options",
      "Sample requests tied to the recipe being sampled",
    ],
    cta: "Discover CRM",
    href: `${routes.features}#crm`,
    shot: productAssets.crBuilder,
    flow: flows.crBuilder,
  },
];

/* -------------------------------------------------------- why flavor studio */

/*
 * Why teams choose Flavor Studio.
 *
 * These were five stacked clichés — "one-stop shop for all product development
 * needs", "hit the ground running and be productive from the get-go",
 * "best-in-class customer service". Nothing in them was falsifiable, so nothing
 * in them was persuasive, and every line would have read the same under a
 * different company's logo. Each is now a specific mechanism.
 */
export const whyPoints = [
  {
    icon: "leaves",
    title: "9,000 USDA ingredients, plus yours",
    body: "The SR28 database is built in. Custom ingredients sit beside it, and most teams import theirs from a vendor spec sheet — the tool reads the PDF and pulls the nutrient values in.",
  },
  {
    icon: "branch-one",
    title: "Change it once, everywhere",
    body: "Update a cost, a supplier or an allergen on the ingredient itself. Every recipe, label and spec sheet that uses it follows — including the ones you have already published.",
  },
  {
    icon: "doc-detail",
    title: "Labels that hold up",
    body: "US FDA and Health Canada panels generated by the label engine from the formula's own analysed values, print-ready in six layouts, with the ingredient statement and allergen declaration alongside.",
  },
  {
    icon: "all-application",
    title: "Use one module or all eighteen",
    body: "Unlike an ERP, nothing here demands a full rollout. Teams usually start with recipes and labels, then add taste tests, projects or CRM when they are ready.",
  },
  {
    icon: "headset-one",
    title: "Support from people who know food",
    body: "Phone, email and in-app chat, from a team that has been building product-development tools for food and beverage manufacturers since 2011.",
  },
];

/* -------------------------------------------------------------- landing FAQ */

export const homeFaqs = [
  {
    q: "Is our data secure, and who owns the recipes?",
    a: "Formulas are trade secrets and we treat them that way. Data lives on highly secure servers and is shared only with your team, all web communication is TLS-encrypted, accounts use two-step authentication, and sign-on IP addresses are logged. You own what you create — the API or a one-click JSON download gets it out.",
  },
  {
    q: "How hard is it to move off our spreadsheets?",
    a: "Most teams start with the ingredient library — 9,000+ USDA ingredients are built in, and supplier ingredients import straight from a vendor spec sheet PDF — then rebuild recipes on top. Start with recipes and labels and add other modules when you are ready; 24/7 support is there by phone, email or in-app chat.",
  },
  {
    q: "Can we trust what the AI Agent tells us?",
    a: "It reads only your workspace, and every answer cites the recipe, regulation or test it came from. If it cannot source an answer it says so rather than guessing, and it only ever proposes draft versions for a developer to approve.",
  },
];

/* -------------------------------------------------------------- pricing FAQ */

export const pricingFaqs = [
  {
    q: "Is there a free trial to test Flavor Studio?",
    a: "Yes — a 14-day, totally free trial with access to 100% of Flavor Studio’s functionality. No credit card required, add as many users as you need, and nothing you create is lost when you transition to a paid plan.",
  },
  {
    q: "How much does Flavor Studio cost?",
    a: "Plans start at $100 per user per month billed annually ($110 month-to-month). The Premium plan with additional features is $150/$165. Teams with more than 30 users get a custom Enterprise solution.",
  },
  {
    q: "Do we have to pay for upgrades?",
    a: "No. As a SaaS product, updates happen seamlessly behind the scenes — every user is always on the most current version with the latest tools, automatically.",
  },
  {
    q: "Are there any long-term contracts to sign?",
    a: "Nope. You pay as you go, monthly or annually, for the services and users that you need.",
  },
  {
    q: "How do I cancel?",
    a: "Account closure is handled personally, case by case — just drop us a line. To stop billing for a single user, mark them inactive on your administration screen and they won’t be counted in the next payment.",
  },
  {
    q: "Do I need a credit card to sign up?",
    a: "No. The trial needs only your name, email and a password. A card is requested only when the two weeks are over and you choose to continue.",
  },
  {
    q: "How does billing work?",
    a: "Billing runs automatically, monthly or annually. On each anniversary, Flavor Studio counts active users and bills accordingly. First payment is by card; after that you can switch to ACH or a traditional invoice.",
  },
  {
    q: "Are there other hidden charges or supplemental modules?",
    a: "No. The only additional charges would be for custom development you explicitly request for your organization alone.",
  },
  {
    q: "Do you offer academic discounts to universities?",
    a: "Yes — Senspire has supported food science and culinology programs from day one. Reach out through the contact form and we’ll make it happen.",
  },
];

/* ----------------------------------------------------------------- full FAQ */

export const faqGroups = [
  {
    title: "About Us",
    icon: "home",
    items: [
      {
        q: "How long have you been in business?",
        a: "Senspire has been helping food and beverage companies bring better products to market since 2011. It began with an algorithm that predicted flavor combinations — named Inspire — and over the following decade grew into a complete suite of product-development tools for food and beverage manufacturers.",
      },
      {
        q: "Who are your customers?",
        a: "CPG manufacturers, ingredient suppliers, product developers, flavor and fragrance companies, QSR and fast casual chains, food science and culinology programs, sensory science companies, consumer research agencies, and dieticians. If you create, manufacture or supply the food and beverage industry, Flavor Studio is designed for you.",
      },
    ],
  },
  {
    title: "Using Flavor Studio",
    icon: "mouse",
    items: [
      {
        q: "Is Flavor Studio easy to use?",
        a: "Yes. The team invests heavily in making advanced tools intuitive — one look and it’s clear how to use it. And if you ever get stuck, 24/7 support is available by phone, email, or the chat built right into the program.",
      },
      {
        q: "Do I have to download anything? Will it run on my computer?",
        a: "Nothing to download or install — Flavor Studio is completely cloud-based, runs in all current browsers, and is optimized for mobile devices without any apps.",
      },
      {
        q: "How can Flavor Studio save me time?",
        a: "It imports nutrient data straight from ingredient spec files, and automates calculations like moisture and fat loss adjustments, processing loss, nutritional analysis, costing, batch scaling and ice-cream fill weight from overrun percentage. It also speeds team communication by sharing data across recipes, projects and CRM opportunities.",
      },
      {
        q: "Do I have to use every module?",
        a: "No. Unlike an ERP, each component stands alone — sign up and use just recipes and labels today, then expand into projects, CRM or taste tests as your needs grow. Flavor Studio is flexible by design.",
      },
      {
        q: "What collaboration tools does it offer?",
        a: "User privileges and groups, defined roles, recipe sharing with per-user or per-group edit/read rights, stage/gate project management with full Gantt reporting, and a CRM module with opportunity and task support.",
      },
      {
        q: "Can we download our data if we leave?",
        a: "Yes — the API is the easiest route, and for recipes there’s a button that downloads a JSON file in seconds.",
      },
    ],
  },
  {
    title: "Recipes, Ingredients, and Labeling",
    icon: "chef-hat-one",
    items: [
      {
        q: "Are multiple versions of a recipe supported?",
        a: "Yes — duplicate a recipe into as many versions as you need, name them for easy reference, and review every edit with the History tool. Flavor Studio records each modification, showing how a formula changed over time and by whom.",
      },
      {
        q: "How many ingredients are in the nutritional database? Can I add my own?",
        a: "Over 9,000 ingredients from the USDA’s trusted SR28 database are built in. You can also add custom ingredients — most users import them from vendor spec sheets with a tool that reads a PDF and imports the nutrient values automatically.",
      },
      {
        q: "Are compliant nutritional labels generated?",
        a: "Yes — US and Canadian labels with full FDA and Health Canada compliance. As your recipe or serving sizes change, the nutritional information updates automatically.",
      },
      {
        q: "What label layouts are supported?",
        a: "All standard layouts — vertical, tabular, side-by-side, linear and dual column — plus additional vitamins and minerals beyond the mandatory four. Export as PNG for internal drafts or high-res vector PDF for your packaging designer.",
      },
      {
        q: "Are yield adjustments taken into account?",
        a: "Yes. Enter a loss amount or a target value, by percentage or gram weight, and the effect on nutrition is handled — including complex cases like ice-cream overrun, where fill weight is calculated from your overrun percentage and container size.",
      },
      {
        q: "Can I export recipes to share with others?",
        a: "Print them, download for Word, export CSV for Excel, publish read-only PDFs, or save to the encrypted FS format that carries embedded custom ingredients to Flavor Studio users outside your company.",
      },
    ],
  },
  {
    title: "Pricing",
    icon: "funds",
    items: [
      {
        q: "Is there a free trial?",
        a: "Yes — a 14-day, totally free trial with 100% of the functionality, no credit card required. Add as many users as you need; everything you build carries over when you become a customer.",
      },
      {
        q: "How much does Flavor Studio cost?",
        a: "From $100 per user per month billed annually ($110 monthly). Premium is $150/$165, and teams over 30 users get a custom Enterprise plan.",
      },
      {
        q: "Are there long-term contracts or hidden fees?",
        a: "No contracts — pay as you go, monthly or annually. The only charge is the licensing fee; custom development happens only if you explicitly request it.",
      },
      {
        q: "Do you offer academic discounts?",
        a: "Yes — Senspire has supported food science and culinology programs from day one. Reach out via the contact form.",
      },
    ],
  },
  {
    title: "Security and Integrations",
    icon: "protect",
    items: [
      {
        q: "Is my intellectual property secure?",
        a: "Data lives on highly secure servers and is shared only with your team. All web communication is TLS-encrypted, accounts use two-step authentication, and sign-on IP addresses are logged for traceability.",
      },
      {
        q: "Can I share my login credentials?",
        a: "Use the user-management module instead — multiple users can share data, projects and opportunities. Only one concurrent session is allowed per account, and two-factor authentication makes credential sharing impractical by design.",
      },
      {
        q: "Does Flavor Studio connect with other applications?",
        a: "Yes, through a full internet-based API that securely exposes all your data using industry standards — connect any ERP, accounting package or other application you choose.",
      },
    ],
  },
];

/* -------------------------------------------------------- industry segments */

export const industrySegments = [
  { name: "CPG Manufacturers", icon: "factory-building" },
  { name: "Ingredient Suppliers", icon: "box" },
  { name: "Product Developers", icon: "experiment" },
  { name: "Flavor and Fragrance Companies", icon: "leaves" },
  { name: "QSR Chains", icon: "hamburger" },
  { name: "Fast Casual Restaurant Chains", icon: "knife-fork" },
  { name: "Food Science Programs", icon: "degree-hat" },
  { name: "Culinology Programs", icon: "chef-hat-one" },
  // Icon Park has no "tongue" glyph in the pinned version; "mouth" is the
  // closest match inside the same family.
  { name: "Sensory Science Companies", icon: "mouth" },
  { name: "Consumer Research Agencies", icon: "chart-histogram" },
  { name: "Dieticians and Nutritionists", icon: "doc-detail" },
];
