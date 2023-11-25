export class GetSnippetsQuery {
  constructor(
    public readonly category: string,
    public readonly skip: number,
    public readonly limit: number,
  ) {}
}
