export abstract class UseCase<T, A = void> {
  abstract execute(args: A): Promise<T>;
}
