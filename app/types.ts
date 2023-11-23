export interface SloganResponseType {
  data: {
    input: string;
    num_sequences: number;
    language: string;
    model: string;
  };

  result: {
    id: number;
    ms: number;
    device: string;
    predictions: string[];
  };

  datetime: number;
}

export interface LogoResponseType {
  data: {
    brand_personality: string;
    brand_name: string;
    category: string;
    industry: string;
    num_images: number;
    num_inference_steps: number;
    lan: string;
    prompt: string;
  };

  result: {
    id: number;
    ms: number;
    predictions: string[];
    recommend: Recommend[];
  };

  datetime: number;
}

export interface Recommend {
  order: number;
  score: number;
}

export interface IndustryCategory {
  Category: string;
  CategoryKor: string;
  SubCategory: Industry[];
}

export interface Industry {
  Industry: string;
  "Industry Ko": string;
}

export interface AppInfo {
  email: string;
  password: string;
  passwordConfirm: string;
  phone: string;

  accessToken: string;
  refreshToken: string;

  isAdmin: boolean;

  language: string;
}

export interface BaseInfo {
  width: number;
  height: number;
}

export interface BrandInfo {
  id: number;

  identity: string;
  name: string;
  category: string;
  logoColor: string;
  symbols: string;
  style: string;
  industry: Industry;
  material: string;
  workOwn: number;
  special: SpecialData;
  description: string;
  personality: string;
  emotion: string;

  color: {
    main: BrandColor;
    sub: BrandColor;
  };

  fontFamily: string;
  logo: string;
  slogan: string;
  coreValue: string;
  story: string;
  mission: string;
  vision: string;

  engineIndex: {
    logo: any;
    slogan: any;
    coreValue: any;
    userData: number;
  };

  selected: {
    logo: number;
    slogan: number;
    coreValue: number;
    fontFamily: number;
  };

  resulted: {
    logo: number;
    slogan: number;
    coreValue: number;
  };

  disableLogoColor: number;
  disableName: number;
  disableSymbols: number;
  disableStyle: number;
  disableMaterial: number;
  disableEmotion: number;

  logoType: number;
  logoShape: string;

  ipfrom: string;

  rating: number;
  ratingFeedback: string;
}

export interface BrandIdentity {
  coreValue: SloganResponseType[];
  slogan: SloganResponseType[];
  logo: LogoResponseType[];
}

export interface BrandColor {
  rgb: string;
  hex: string;
}

export interface Personality {
  name: string;
  value: string;
  image: string;
  childs: PersonalityChild[];
}

export interface SpecialData {
  name: string;
  nameKor: string;
}
export interface KeyValue {
  name: string;
  value: string;
}
export interface PersonalityChild {
  name: string;
  image: string;
}

export interface LoginType {
  mode: "login" | "signup" | "password" | "admin" | "advert";
}

export interface ColorRGBType {
  r: number;
  g: number;
  b: number;
}

export interface ParallaxProps {
  children: any;
  baseVelocity: number;
  direction: number;
  endOffset: number;
  length: number;
  scrollRef: any;
}

export interface API {
  query: string;
  method: string;
  data: any;
  auth: boolean;
}

export interface TestLogoInput {
  category: string;
  positive_prompt: string;
  negative_prompt: string;
  num_images: string;
  num_inference_steps: string;
  pixel_resolution: string;
  compression_format: string;
  type: string;
}
export interface DataList {
  columnCount: number;
  pagination: [];
  totalPage: number;
}

export interface Board {
  author: string;
  content: string;
  hit: number;
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
}

export interface Notice {
  author: string;
  content: string;
  hit: number;
  id: number;
  title: string;
  updatedAt: string;
  attached: string;
}

export interface BoardInput {
  category: string;
  title: string;
  thumbnail: string;
  content: string;
  attached: string;
}

export interface ToastUIEditorProps {
  initialValue: string;
  onBlur: (event: string) => void;
}

export interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

export interface Prompt {
  detailed: boolean;
  positive: string;
  negative: string;
}
