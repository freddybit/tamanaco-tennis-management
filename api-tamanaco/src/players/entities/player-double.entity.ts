import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Player } from './player.entity';
import { Double } from './double.entity';

@Entity('playerdouble')
export class PlayerDouble {
  @PrimaryGeneratedColumn({ name: 'playerdoublekey' })
  playerDoubleKey!: number;

  @Column({ name: 'player_profilekey', type: 'int' })
  player_profileKey!: number;

  @Column({ name: 'double_doublekey', type: 'int' })
  double_doubleKey!: number;

  @ManyToOne(() => Player, (player) => player.playerDoubles)
  @JoinColumn({ name: 'player_profilekey' })
  player!: Player;

  @ManyToOne(() => Double, (double) => double.playerDoubles)
  @JoinColumn({ name: 'double_doublekey' })
  double!: Double;

  constructor(partial?: Partial<PlayerDouble>) {
    if (partial) {
      Object.assign(this, partial);
    }
  }
}