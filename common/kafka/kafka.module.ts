import { Module, DynamicModule } from '@nestjs/common';
import { ClientsModule, Transport, ClientProviderOptions } from '@nestjs/microservices';

@Module({})
export class KafkaModule {
  static register(topics: string[]): DynamicModule {
    const providers: ClientProviderOptions[] = topics.map((topic) => ({
      name: `${topic.toUpperCase()}_SERVICE`,
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: `${topic}-client`,
          brokers: ["localhost:9092"],
        },
        consumer: {
          groupId: `${topic}-group`,
        },
      },
    }));

    return {
      module: KafkaModule,
      imports: [ClientsModule.register(providers)],
      exports: [ClientsModule],
    };
  }
}
