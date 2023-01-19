import { APP_HTML_TITLE } from 'config/common';
import { generatePath } from 'react-router';
import { RouteProps } from 'react-router-dom';

import { IRouterTypes } from './index';

interface IExtraProps {
  namePrefix: string;
  nameSuffix: string;
}

const EXTRA_DEFAULT: IExtraProps = {
  namePrefix: '',
  nameSuffix: ''
};

export type IExtendedRouteProps = RouteProps & {
  disabledFlatsCheck?: boolean;
};

interface IProps {
  type: IRouterTypes;
  name: string;
  routeProps: IExtendedRouteProps;
  breadcrumbs?: IRouterTypes[];
  htmlTitle?: string;
}

export type IRouterConfigGenerator<T = unknown> = RouterConfigGenerator<T>;

export default class RouterConfigGenerator<IGeneratePath = undefined> {
  private _name: IProps['name'];
  private _routeProps: IProps['routeProps'];
  private _htmlTitle: string;
  private _simplePath: string;
  private _extra: IExtraProps & { pathProps: IGeneratePath };

  constructor({ name, routeProps, htmlTitle = name }: IProps) {
    this._name = name;
    this._routeProps = routeProps;
    this._htmlTitle = `${APP_HTML_TITLE} - ${htmlTitle}`;
    this._simplePath = this.extractSimplePath();
    this._extra = this.getDefaultExtra();
  }

  get name(): IProps['name'] {
    return `${this._extra.namePrefix}${this._name}${this._extra.nameSuffix}`;
  }

  get routeProps(): IProps['routeProps'] {
    return this._routeProps;
  }

  get htmlTitle(): string {
    return this._htmlTitle;
  }

  set extra({
    namePrefix,
    nameSuffix,
    ...props
  }: Partial<IExtraProps & { pathProps: IGeneratePath }>) {
    this._extra = {
      ...this._extra,
      ...props,
      namePrefix: namePrefix || this._extra.namePrefix || EXTRA_DEFAULT.namePrefix,
      nameSuffix: nameSuffix || this._extra.nameSuffix || EXTRA_DEFAULT.nameSuffix
    };
  }

  public reset(): void {
    this._extra = this.getDefaultExtra();
  }

  public path(props?: IGeneratePath): string {
    return generatePath(this._simplePath, props || this._extra.pathProps || undefined);
  }

  private getDefaultExtra(): IExtraProps & { pathProps: IGeneratePath } {
    return { ...EXTRA_DEFAULT, pathProps: (undefined as unknown) as IGeneratePath };
  }

  private extractSimplePath(): string {
    const path = this._routeProps.path;

    return path ? (typeof path === 'string' ? path : path[0]) : '';
  }
}
