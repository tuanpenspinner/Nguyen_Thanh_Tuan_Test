export interface IEmployee {
  id: number;
  positionResourceId: number;
  displayOrder: number;
  toolLanguages: IToolLanguages[];
}

export interface IToolLanguages {
  id: number;
  toolLanguageResourceId: number;
  toFrom: [string, string];
  description: string;
  images: Image[];
}

export interface Image {
  id: number;
  cdnUrl: string;
  displayOrder: number;
}

export interface IPositionResources {
  positionResourceId: number;
  name: string;
  toolLanguageResources: IToolLanguageResources[];
}

export interface IToolLanguageResources {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
}
