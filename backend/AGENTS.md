Instructions

- Never use entities inside controllers
- Controllers can only call usecases and presenters

Test patterns

- `sut` for system under test
- `jest.fn()` and `jest.Mocked` for mocks
- Test files with suffix `.unit.spec.ts`, `.int.spec.ts`, `.e2e.spec.ts`
- Use of `describe("X (unit ou integration) test")` in tests
