// import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // until the database is set up, we can call out to the working MomentumLabs API.
  // This will be replaced with a call to the database once it is set up.
  const response = await fetch(
    'https://momentumlabs.app/api/timeline?' + new URLSearchParams(_req.query)
  );
  const data = await response.json();
  return res.status(200).json(data);
};

// const videoPostfix = 'Animated_1080_1920_Black.mp4';
// const imagePostfix = 'Player_2880_2880_Black.jpg';
// const prisma = new PrismaClient();

/*
const DEFAULT_SORT = 'playerName';

const orderByFields = [
  'editionExternalId',
  'setExternalId',
  'playExternalId',
  'playerName',
  'flowName',
  'flowSeriesNumber',
  'playCategory',
  'circulationCount',
  'setVisualId',
  'jerseyNumber',
  'currentTeam',
  'teamAtMoment',
  'teamAtMomentId',
  'draftYear',
  'playerId',
  'setFlowId',
  'playFlowId',
  'stats',
  'description',
  'assetPathPrefix',
  'statsPlayerGameScores',
  'hasAvatar',
  'tags',
  'statsSnapshot',
  'momentum',
  'averageSalePrice',
  'aspDays',
  'aspSales',
  'floor',
  'percentChange',
  'priceChange',
  'priceUpdatedAt',
  'circulationForSale',
  'circulationOwned',
  'circulationHiddenInPacks',
  'circulationLockerRoom',
  'circulationBurned',
  'circulationLocked',
  'numActiveOwners',
  'isTsd',
  'isReward',
  'isRookiePremiere',
  'isRookieMint',
  'isRookieYear',
  'isChampionshipYear',
  'isMvpYear',
  'isCraftingReward',
  'isLeaderboardReward',
  'uniqueSellerCount',
  'league',
];

const createFilter = (
  playerId?: string,
  currentTeam?: string,
  teamAtMoment?: string,
  flowName?: string,
  flowSeriesNumber?: string,
  setVisualId?: string,
  badge?: string,
  playCategory?: string,
  league?: string,
  isOwned?: boolean,
  momentIds?: string[]
): any[] => {
  const filters: any[] = [];
  if (playerId) {
    const playerArray = playerId.split(',').map((p) => parseInt(p || '0'));
    if (playerArray.length > 1) {
      filters.push({ playerId: { in: playerArray } });
    } else {
      filters.push({ playerId: parseInt(playerId || '0') });
    }
  }
  if (currentTeam) {
    const teamArray = currentTeam.split(',');
    if (teamArray.length > 1) {
      filters.push({ currentTeam: { in: teamArray } });
    } else {
      filters.push({ currentTeam });
    }
  }
  if (teamAtMoment) {
    const teamArray = teamAtMoment.split(',');
    if (teamArray.length > 1) {
      filters.push({ teamAtMoment: { in: teamArray } });
    } else {
      filters.push({ teamAtMoment });
    }
  }
  if (flowName) {
    const flowArray = flowName.split(',');
    if (flowArray.length > 1) {
      filters.push({ flowName: { in: flowArray } });
    } else {
      filters.push({ flowName });
    }
  }
  if (flowSeriesNumber) {
    const flowSeriesNumberArray = flowSeriesNumber.split(',');
    if (flowSeriesNumberArray.length > 1) {
      filters.push({
        flowSeriesNumber: { in: flowSeriesNumberArray.map((n) => parseInt(n)) },
      });
    } else {
      filters.push({ flowSeriesNumber: parseInt(flowSeriesNumber) });
    }
  }
  if (setVisualId) {
    const setVisualIdArray = setVisualId.split(',');
    if (setVisualIdArray.length > 1) {
      filters.push({ setVisualId: { in: setVisualIdArray } });
    } else {
      filters.push({ setVisualId });
    }
  }
  if (badge) {
    const badgeArray = badge.split(',');
    badgeArray.forEach((_badge: string) => {
      filters.push({ [_badge]: true });
    });
  }
  if (playCategory) {
    const playCategoryArray = playCategory.split(',');
    if (playCategoryArray.length > 1) {
      filters.push({ playCategory: { in: playCategoryArray } });
    } else {
      filters.push({ playCategory });
    }
  }
  if (league) {
    console.log('league', league);
    const leagueArray = league.split(',');
    if (leagueArray.length > 1) {
      filters.push({ league: { in: leagueArray } });
    } else {
      filters.push({ league });
    }
  }
  if (isOwned) {
    filters.push({
      editionExternalId: {
        in: momentIds,
      },
    });
  }

  return filters;
};

const getEditionsFromDB = async (
  page: number,
  pageSize: number,
  filters: any,
  minPrice: number,
  maxPrice: number,
  maxCirculation: number,
  sort: string,
  order: string,
  skipPaging: boolean
): Promise<Edition[]> => {
  // get all of the Editions from the database but do not include the stats or description. Include pagination.

  const orderBy = {
    [sort]: order,
  };
  const editions =
    filters && Object.keys(filters).length > 0
      ? await prisma.edition.findMany({
          skip: skipPaging ? 0 : (page - 1) * pageSize,
          take: skipPaging ? 999999 : pageSize,
          where: {
            AND: [
              ...filters,
              {
                floor: {
                  lte: maxPrice,
                },
              },
              {
                floor: {
                  gte: minPrice,
                },
              },
              {
                circulationCount: {
                  gt: 5,
                  lte: maxCirculation,
                },
              },
            ],
          },
          select: {
            id: true,
            playerName: true,
            teamAtMoment: true,
            description: true,
            assetPathPrefix: true,
            stats: true,
            flowName: true,
            flowSeriesNumber: true,
          },
          orderBy,
        })
      : await prisma.edition.findMany({
          skip: skipPaging ? 0 : (page - 1) * pageSize,
          take: skipPaging ? 999999 : pageSize,
          where: {
            AND: [
              {
                circulationCount: {
                  gt: 5,
                  lte: maxCirculation,
                },
              },
              {
                floor: {
                  lte: maxPrice,
                },
              },
              {
                floor: {
                  gte: minPrice,
                },
              },
            ],
          },
          select: {
            id: true,
            playerName: true,
            teamAtMoment: true,
            description: true,
            assetPathPrefix: true,
            stats: true,
            flowName: true,
            flowSeriesNumber: true,
          },
          orderBy,
        });
  return editions;
};

interface TimelineData {
  events: Slide[];
  title?: Slide;
  eras?: Era[];
  scale?: 'human' | 'cosmological';
}

interface Slide {
  start_date: DateObject;
  end_date?: DateObject;
  text?: TextObject;
  media?: MediaObject;
  group?: string;
  display_date?: string;
  background?: {
    url: string;
    alt?: string;
    color?: string;
  };
  autolink?: boolean;
  unique_id?: string;
}

interface Era {
  start_date: DateObject;
  end_date: DateObject;
  text?: TextObject;
}

interface DateObject {
  year: number;
  month?: number;
  day?: number;
  hour?: number;
  minute?: number;
  second?: number;
  millisecond?: number;
  display_date?: string;
  format?: string;
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

const getSeasonStartDate = (season: string) => {
  // season is the start of the year, so 2022, 2021, etc...
  const year = parseInt(season, 10);
  const month = 10; // October
  const day = 1; // first day of the month, close enough
  return new Date(year, month, day);
};

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  // until the database is set up, we can call out to the working MomentumLabs API.
  // This will be replaced with a call to the database once it is set up.
  const response = await fetch(
    'https://momentumlabs.app/api/timeline?' + new URLSearchParams(_req.query)
  );
  const data = await response.json();
  res.status(200).json(data);
  return
  try {
    const playerId = (_req.query.player_id as string) || ''; // TODO: type and validate
    const currentTeam = (_req.query.current_team as string) || ''; // TODO: type and validate
    const teamAtMoment = (_req.query.team_at_moment as string) || ''; // TODO: type and validate
    const flowName = (_req.query.flow_name as string) || ''; // TODO: type and validate
    const flowSeriesNumber = (_req.query.flow_series_number as string) || ''; // TODO: type and validate
    const setVisualId = (_req.query.set_visual_id as string) || ''; // TODO: type and validate
    const badge = (_req.query.badge as string) || ''; // TODO: type and validate
    const playCategory = (_req.query.play_category as string) || ''; // TODO: type and validate
    const league = (_req.query.league as string) || ''; // TODO: type and validate
    const isOwned = (_req.query.is_owned as string) == 'true'; // TODO: type and validate
    const maxPrice = (_req.query.max as string) || '99999999'; // TODO: type and validate
    const minPrice = (_req.query.min as string) || '0'; // TODO: type and validate
    const maxCirculation = (_req.query.max_circulation as string) || '99999999'; // TODO: type and validate
    const season = (_req.query.season as string) || '2022'; // TODO: type and validate

    const sortField = (_req.query.sort as string) || DEFAULT_SORT; // TODO: type and validate
    const order = (_req.query.order as string) || 'asc'; // TODO: type and validate
    // get the page number and page size from the query string
    const page = parseInt(_req.query.page as string, 10) || 1;
    const pageSize = parseInt(_req.query.page_size as string, 10) || 500;

    const seasonStartDate = getSeasonStartDate(season);

    const filters = createFilter(
      playerId,
      currentTeam,
      teamAtMoment,
      flowName,
      flowSeriesNumber,
      setVisualId,
      badge,
      playCategory,
      league
    );
    let skipPaging = false;
    let sort = sortField;
    if (!orderByFields.includes(sortField) || isOwned) {
      skipPaging = true;
      sort = DEFAULT_SORT;
    }
    // add min and max as ints
    let editions = await getEditionsFromDB(
      page,
      pageSize,
      filters,
      parseInt(minPrice, 10),
      parseInt(maxPrice, 10),
      parseInt(maxCirculation, 10),
      sort,
      order,
      skipPaging
    );

    editions = editions
      .map((e) => {
        if (e.stats && e.stats.dateOfMoment) {
          try {
            const dateOfMoment = e.stats.dateOfMoment;
            const date = new Date(dateOfMoment);
            if (date) {
              // remove the stats from the edition
              // delete e.stats;
              return {
                ...e,
                date,
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
              };
            }
          } catch (error) {
            console.error(error);
          }
        }
        return e;
      })
      .filter((e) => e.date)
      .filter((e) => e.date && e.date.getTime() >= seasonStartDate.getTime())
      .sort((a, b) => {
        // sort by date
        if (a.date && b.date) {
          return a.date.getTime() - b.date.getTime();
        }
        return 0;
      });

    const events: Slide[] = editions.map((e, idx) => {
      const date = e.date;
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const start_date = {
        year,
        month,
        day,
      };
      const headline = e.playerName;
      const videoUrl = e.assetPathPrefix + videoPostfix;
      const imageUrl = e.assetPathPrefix + imagePostfix;
      const text = {
        headline: e.playerName,
        text: `<p className="text-xl text-ts_pink">${e.flowName}</p><p>${e.description}</p>`,
      };
      const media = {
        url: videoUrl,
        thumbnail: imageUrl,
        alt: e.playerName,
      };
      const background = {
        url: imageUrl,
      };
      const autolink = false;
      const unique_id = `${idx}`;
      const slide: Slide = {
        start_date,
        headline,
        text,
        media,
        background,
        autolink,
        unique_id,
      };
      return slide;
    });

    const timelineData: TimelineData = {
      title: {
        text: {
          headline: `The Story`,
        },

        media: {
          url: '/images/hourglass.png',
          alt: 'The Story',
        },
        start_date: {
          year: seasonStartDate.getFullYear(),
          month: seasonStartDate.getMonth() + 1,
          day: 1,
        },
      },
      events,
    };

    res.status(200).json(timelineData);
    // res.status(200).json(editions);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

  */
export default handler;
