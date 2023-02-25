import { NbaStats10D, Prisma } from '@prisma/client';

const nbaGameWithRelations = Prisma.validator<Prisma.nbaGameArgs>()({
  include: {
    homeTeam: true,
    awayTeam: true,
  },
});

const nbaStatsWithRelations = Prisma.validator<Prisma.nbaStatsArgs>()({
  include: {
    nbaGame: {
      include: {
        homeTeam: true,
        awayTeam: true,
      },
    },
    nbaPlayer: {
      include: {
        nbaStatsSeasonAverage: true,
        nbaTeam: true,
        nbaInjury: {
          select: {
            certainty: true,
            status: true,
          },
        },
        editions: true,
      },
    },
  },
});

const nbaPlayerWithRelations = Prisma.validator<Prisma.nbaPlayerArgs>()({
  include: {
    nbaStatsSeasonAverage: true,
    nbaTeam: true,
    nbaInjury: {
      select: {
        certainty: true,
        status: true,
      },
    },
    editions: {
      include: {
        statsSnapshot: true,
      },
    },
  },
});

const editionWithRelations = Prisma.validator<Prisma.editionArgs>()({
  include: {
    statsSnapshot: true,
  },
});

type NbaGameBase = Prisma.nbaGameGetPayload<typeof nbaGameWithRelations>;
type NbaStatsBase = Prisma.nbaStatsGetPayload<typeof nbaStatsWithRelations>;
type NbaPlayerBase = Prisma.nbaPlayerGetPayload<typeof nbaPlayerWithRelations>;
type EditionBase = Prisma.editionGetPayload<typeof editionWithRelations>;

export type NbaGame = NbaGameBase;

export interface NbaStats extends Omit<NbaStatsBase, 'nbaPlayer'> {
  nbaPlayer: NbaPlayer;
}
export interface Edition extends EditionBase {
  numOwned?: number;
  aspDifference?: number;
  tssPerDollar?: number;
  nbaPlayer: NbaPlayer;
  teamId?: string;
}
export interface NbaPlayer extends Omit<NbaPlayerBase, 'editions'> {
  editions?: Edition[];
  editionExternalIds?: (string | null)[];
  veteranExternalIds?: (string | null)[];
  s1ExternalIds?: (string | null)[];
  s2ExternalIds?: (string | null)[];
  nonBaseSetExternalIds?: (string | null)[];
  rareLegendaryExternalIds?: (string | null)[];
  rareExternalIds?: (string | null)[];
  fandomExternalIds?: (string | null)[];
  under15KExternalIds?: (string | null)[];
  floorEdition?: Edition;
  rookieEdition?: Edition;
  veteranEdition?: Edition;
  fandomEdition?: Edition;
  rareLegendaryEdition?: Edition;
  rareEdition?: Edition;
  s1Edition?: Edition;
  s2Edition?: Edition;
  nonBaseSetEdition?: Edition;
  under15KEdition?: Edition;
  totalCirculationCount?: number;
  isBottleneck?: boolean;
  nbaStats10D?: NbaStats10D[];
  teamId?: string;
}
