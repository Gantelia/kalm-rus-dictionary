import './player.scss';

type PlayerProps = {
  audioUrl?: string;
};

function Player({ audioUrl }: PlayerProps) {
  return <audio className="player" src={audioUrl} controls></audio>;
}

export default Player;
