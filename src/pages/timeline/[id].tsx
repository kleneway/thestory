import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

interface DateObject {
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  display_date?: string;
}
interface TextObject {
  headline?: string;
  text?: string;
}
interface MediaObject {
  url: string;
  caption?: string;
  credit?: string;
  thumbnail?: string;
  alt?: string;
  title?: string;
  link?: string;
  link_target?: string;
}
interface TitleSlide {
  start_date?: DateObject;
  end_date?: DateObject;
  text?: TextObject;
  media?: MediaObject;
  group?: string;
  display_date?: string;
  background?: {
    url?: string;
    color?: string;
  };
  autolink?: boolean;
  unique_id?: string;
}
type Slide = TitleSlide & { start_date: DateObject };
interface TimelineOptions {
  font?: string;
  debug?: boolean;
  height?: number;
  width?: number;
  is_embed?: boolean;
  hash_bookmark?: boolean;
  default_bg_color?:
    | string
    | {
        r: number;
        g: number;
        b: number;
      };
  scale_factor?: number;
  initial_zoom?: number;
  zoom_sequence?: number[];
  timenav_position?: 'top' | 'bottom';
  optimal_tick_width?: number;
  base_class?: string;
  timenav_height?: number;
  timenav_height_percentage?: number;
  timenav_mobile_height_percentage?: number;
  timenav_height_min?: number;
  marker_width_min?: number;
  marker_padding?: number;
  start_at_slide?: number;
  start_at_end?: boolean;
  menubar_height?: number;
  use_bc?: boolean;
  duration?: number;
  ease?: any; // default: TL.Ease.easeInOutQuint (don't know the type of this)
  dragging?: boolean;
  trackResize?: boolean;
  slide_padding_lr?: number;
  slide_default_fade?: string;
  language?: string;
  ga_property_id?: string | null;
  track_events?: string[];
  script_path?: string;
}
interface TimelineProps {
  target: JSX.Element;
  events: Slide[];
  title?: TitleSlide;
  options?: TimelineOptions;
}

interface Props {
  galleryId: string;
}

interface Gallery {
  galleryId: string;
  title: string;
  params: string;
}

const galleries = [
  {
    galleryId: '1',
    title: '2022-23 NBA Season - The Story',
    params:
      'flow_series_number=5&flow_name=For+the+Win%2CThrowdowns%2CVideo+Game+Numbers&league=NBA&season=2022',
  },
  {
    galleryId: '2',
    title: '2021-22 NBA Season - The Story',
    params:
      'flow_series_number=2&set_visual_id=SET_VISUAL_LEGENDARY&league=NBA&season=2020',
  },
  {
    galleryId: '3',
    title: '2020-21 NBA Season - The Story',
    params:
      'flow_series_number=1&set_visual_id=SET_VISUAL_LEGENDARY&league=NBA&season=2019',
  },
  {
    galleryId: '4',
    title: '2022 WNBA Season - The Story',
    params:
      'flow_name=WNBA+Metallic+Gold+LE%2CIn+Their+Bag%2CFor+the+Cup&flow_series_number=5&league=WNBA&season=2021',
  },
  {
    galleryId: '5',
    title: '2021 WNBA Season - The Story',
    params:
      'flow_name=WNBA%3A+Best+of+2021&flow_series_number=3&league=WNBA&season=2020',
  },
  {
    galleryId: '6',
    title: '38,388: The LeBron James Story',
    params: 'player_id=2544&season=1999',
  },
  {
    galleryId: '7',
    title: '2022 Warriors Championship Season Highlights',
    params: 'team_at_moment=Warriors&flow_series_number=4&season=2021',
  },
  {
    galleryId: '8',
    title: 'The Best of the Bubble - 2020 NBA Playoffs',
    params:
      'flow_name=2020+NBA+Finals%2CEastern+Conference+Finals%2CWestern+Conference+Finals%2CFirst+Round%2CConference+Semifinals&flow_series_number=1&season=2019',
  },
  {
    galleryId: '9',
    title: "Let's Run it Back",
    params:
      'flow_name=Run+It+Back%2CRun+It+Back+1986-87%2CRun+It+Back+2005-06%2CRun+It+Back%3A+Legacies+1986-87&season=1986',
  },
  {
    galleryId: '10',
    title: 'Legendary Dunks',
    params: 'play_category=Dunk&set_visual_id=SET_VISUAL_LEGENDARY&season=2020',
  },
  {
    galleryId: '11',
    title: 'Not In My House - Legendary Blocks',
    params:
      'play_category=Block&set_visual_id=SET_VISUAL_LEGENDARY&season=2020',
  },
];

const TimelinePage: React.FC<Props> = ({ galleryId }) => {
  const [gallery, setGallery] = React.useState<Gallery>(galleries[0]);

  const router = useRouter();

  useEffect(() => {
    const _gallery = galleries.find(
      (gallery) => gallery.galleryId === galleryId
    );
    if (_gallery) {
      setGallery(_gallery);
      initTimeline(_gallery);
    } else {
      initTimeline(galleries[0]);
    }
  }, [galleryId]);

  const initTimeline = async (gallery: Gallery) => {
    const url = `/api/timeline?${gallery.params}`;
    const res = await fetch(url);
    const _events = await res.json();

    const script = document.createElement('script');
    script.src =
      'https://cdn.knightlab.com/libs/timeline3/latest/js/timeline.js';
    script.onload = () => {
      window.timeline = new TL.Timeline('timeline-embed', _events, {
        default_bg_color: '#14101a',
        timenav_height_percentage: 5,
        zoom_level: 1,
        track_events: [
          'back_to_start',
          'nav_next',
          'nav_previous',
          'zoom_in',
          'zoom_out',
        ],
      });
      const timeline = window.timeline;
      // Add a listener for the 'nav_next' event
      timeline.on('nav_next', (event: any) => {
        const slide = timeline.getCurrentSlide();
        if (slide) {
          const video = slide._media?.player_element;
          if (video) {
            video.play();
          }
        }
      });

      // Add a listener for the 'nav_previous' event
      timeline.on('nav_previous', () => {
        const slide = timeline.getCurrentSlide();
        if (slide) {
          const video = slide._media?.player_element;
          if (video) {
            video.play();
          }
        }
      });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup
      document.head.removeChild(script);
    };
  };

  return (
    <div>
      <Head>
        <link
          title='timeline-styles'
          rel='stylesheet'
          href='https://cdn.knightlab.com/libs/timeline3/latest/css/timeline.css'
        />

        {/* 
        // adding the ts_ colors from the tailwind config
        ts_black: "#0D0D0F",
        ts_gray: "#1D1E20",
        ts_purple: "#C412E3",
        ts_pink: "#FF0E8D",
        ts_yellow: "#E0E41C",
        ts_green: "#00FF26",
        ts_blue: "#1C1372",
        ts_aqua: "#04F6F0",
        ts_red: "#FF1C1E",
        ts_light_green: "#0FB722",
        ts_dark_green: "#008F15",
        ts_dark_blue: "#151140",
        ts_more_dark_blue: "#0A0821",
        ts_darker_blue: "#060514",
        ts_gray_blue: "#006488",
        ts_dark_purple: "#1C1372",
        ml_green: "#109D58",
        ml_gray: "#D9D9D9",
        ml_dark_green: "#116343"
        
        
        
        */}
        <style>{`
          .tl-timeline {
            border: 4px solid #1C1372 !important;
            font-family: Lato, sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 1.3em;
          }
          .tl-timenav {
            background-color: #151140 !important;
            border: 0px solid black !important;
          }
          .tl-timemarker-content-container { 
            background-color: transparent !important;
            border: 0px solid transparent !important;
            color: #FF0E8D !important;
            box-shadow: none !important;
          }
            .tl-attribution {
            display: none;
          }
          .tl-timeline h1,
          .tl-timeline h2,
          .tl-timeline h3,
          .tl-timeline h4,
          .tl-timeline h5,
          .tl-timeline h6 {
            font-family: ShapiroText, Lato, sans-serif;
            text-transform: none;
            font-weight: 700;
            font-size: 46px;
            line-height: 46px;
          }
          .tl-timeline h2.tl-headline-title {
            font-size: 58px;
            line-height: 58px;
            color: #FF0E8D;
          }
          .tl-timeline p {
            font-family: Lato, sans-serif !important;
            font-size: 16px;
            line-height: 1.3em;
          }
          .tl-timeline ul {
            font-family: Lato, sans-serif;
          }
          .tl-timeline .tl-media .tl-media-wikipedia h4 a,
          .tl-timeline .tl-media h4,
          .tl-timeline .tl-media h4 a {
            font-family: Lato, sans-serif;
            font-weight: 700;
            font-size: 24px;
            line-height: 24px;
          }
          .tl-timeline .tl-caption,
          .tl-timeline .tl-credit {
            font-family: Lato, sans-serif;
          }
          .tl-timeline .vcard {
            font-family: Lato, sans-serif !important;
            font-weight: normal !important;
          }
          .tl-timeline .tl-slidenav-next,
          .tl-timeline .tl-slidenav-previous,
          .tl-timeline .tl-message,
          .tl-timeline .tl-timegroup-message {
            font-family: Lato, sans-serif;
            font-weight: 700;
            text-transform: none;
          }
          .tl_slidename-title {
            font-family: Lato, sans-serif;
            color: #FF0E8D;
          }
          .tl-timeline .tl-slidenav-next .tl-slidenav-title,
          .tl-timeline .tl-slidenav-previous .tl-slidenav-title,
          .tl-timeline .tl-message .tl-slidenav-title,
          .tl-timeline .tl-timegroup-message .tl-slidenav-title {
            line-height: 1.3em !important;
            color: #E0E41C !important;
          }
          .tl-timeline .tl-headline-date,
          .tl-timeline h3.tl-headline-date {
            font-family: Lato, sans-serif !important;
            font-weight: normal !important;
            text-transform: none !important;
          }
          .tl-timeline .tl-headline-date small,
          .tl-timeline h3.tl-headline-date small {
            font-weight: normal !important;
          }
          .tl-timeline .tl-timenav-slider {
            font-family: Lato, sans-serif;
            font-weight: 700;
          }
          .tl-timeline .tl-timenav-slider h2.tl-headline {
            font-family: Lato, sans-serif;
            font-weight: 700;
            text-transform: none;
          }
          .tl-timeline .tl-timenav-slider .tl-timeaxis {
            font-family: Lato, sans-serif;
            font-weight: 700;
            text-transform: none;
          }
          .tl-timeline .tl-menubar {
            font-family: Lato, sans-serif;
          }
          .tl-timeline blockquote,
          .tl-timeline blockquote p {
            font-family: Lato, sans-serif;
            font-style: normal;
            font-weight: 400;
            line-height: 1.3;
          }
          input[type="text"].editor-headline {
            font-family: ShapiroText, Lato, sans-serif;
            text-transform: none;
            font-weight: 700;
            font-size: 46px;
            line-height: 46px;
          }
          .tl-media-image {
            margin: 0 auto;
          }
        `}</style>
      </Head>
      <div className='relative mx-auto max-w-7xl py-8'>
        <div className='my-4 text-center'>
          <p className='text-ts_yellow text-sm font-bold tracking-tight'>
            THE STORY
          </p>
          <h2 className='tracking-loose text-ts_pink text-3xl font-bold sm:text-4xl'>
            {gallery?.title || 'Loading...'}
          </h2>
          <div className='relative mx-auto mt-4 inline-block w-full max-w-md'>
            <select
              className='block w-full appearance-none rounded border border-gray-300 bg-white px-4 py-2 pr-8 leading-tight text-gray-700 focus:border-gray-500 focus:bg-white focus:outline-none'
              onChange={(e) => {
                const galleryId = e.target.value;
                router.push(`/timeline/${galleryId}`);
                // router.reload();
              }}
            >
              {galleries?.map((gallery) => (
                <option key={gallery.galleryId} value={gallery.galleryId}>
                  {gallery.title}
                </option>
              ))}
            </select>
            <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2'>
              <svg
                className='h-4 w-4 fill-current'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
              >
                <path d='M7 7l3-3 3 3v6l-3 3-3-3V7z' />
                <path d='M0 0h20v20H0z' fill='none' />
              </svg>
            </div>
          </div>
        </div>
        <div className='mt-8 h-screen bg-red-50'>
          <div id='timeline-embed'></div>
        </div>
      </div>
    </div>
  );
};

type param = { id: string };

export async function getServerSideProps({ params }: { params: param }) {
  try {
    const { id } = params;
    return {
      props: {
        galleryId: id,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
}

export default TimelinePage;
