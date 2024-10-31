import React, { Component, CSSProperties, MouseEvent } from 'react';

interface ReactStarsProps {
  className?: string;
  edit?: boolean;
  half?: boolean;
  value?: number;
  count?: number;
  char?: string;
  size?: number;
  color1?: string;
  color2?: string;
  onChange?: (newValue: number) => void;
}

interface Star {
  active: boolean;
}

interface HalfStar {
  at: number;
  hidden: boolean;
}

interface ReactStarsState {
  uniqueness: string;
  value: number;
  stars: Star[];
  halfStar: HalfStar;
  config: {
    count: number;
    size: number;
    char: string;
    color1: string;
    color2: string;
    half: boolean;
    edit: boolean;
  };
}

const parentStyles: CSSProperties = {
  overflow: 'hidden',
  position: 'relative',
};

const defaultStyles: CSSProperties = {
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  display: 'block',
  float: 'left',
};

const getHalfStarStyles = (color: string, uniqueness: string) => {
  return `
    .react-stars-${uniqueness}:before {
      position: absolute;
      overflow: hidden;
      display: block;
      z-index: 1;
      top: 0; left: 0;
      width: 50%;
      content: attr(data-forhalf);
      color: ${color};
  }`;
};

class ReactStars extends Component<ReactStarsProps, ReactStarsState> {
  static defaultProps: ReactStarsProps = {
    edit: true,
    half: true,
    value: 0,
    count: 5,
    char: '★',
    size: 15,
    color1: '#d6d6d6',
    color2: '#39b54a',
    onChange: () => {},
  };

  constructor(props: ReactStarsProps) {
    super(props);

    this.state = {
      uniqueness: (Math.random() + '').replace('.', ''),
      value: props.value || 0,
      stars: [],
      halfStar: {
        at: Math.floor(props.value || 0),
        hidden: (props.half ?? true) && (props.value || 0) % 1 < 0.5,
      },
      config: {
        count: props.count || 5,
        size: props.size || 15,
        char: props.char || '★',
        color1: props.color1 || '#d6d6d6',
        color2: props.color2 || '#39b54a',
        half: props.half || true,
        edit: props.edit || true,
      },
    };
  }

  componentDidMount() {
    this.setState({
      stars: this.getStars(this.state.value),
    });
  }

  componentDidUpdate(prevProps: ReactStarsProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        stars: this.getStars(this.props.value),
        value: this.props.value || 0,
        halfStar: {
          at: Math.floor(this.props.value || 0),
          hidden: this.state.config.half && (this.props.value || 0) % 1 < 0.5,
        },
      });
    }
  }

  isDecimal(value: number) {
    return value % 1 !== 0;
  }

  getRate() {
    let stars;
    if (this.state.config.half) {
      stars = Math.floor(this.state.value);
    } else {
      stars = Math.round(this.state.value);
    }
    return stars;
  }

  getStars(activeCount?: number) {
    if (typeof activeCount === 'undefined') {
      activeCount = this.getRate();
    }
    const stars: Star[] = [];
    for (let i = 0; i < this.state.config.count; i++) {
      stars.push({
        active: i <= activeCount - 1,
      });
    }
    return stars;
  }

  mouseOver(event: MouseEvent<HTMLSpanElement>) {
    const { config, halfStar } = this.state;
    if (!config.edit) return;
    let index = Number(event.currentTarget.getAttribute('data-index'));
    if (config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size);
      halfStar.hidden = isAtHalf;
      if (isAtHalf) index = index + 1;
      halfStar.at = index;
    } else {
      index = index + 1;
    }
    this.setState({
      stars: this.getStars(index),
    });
  }

  moreThanHalf(event: MouseEvent<HTMLSpanElement>, size: number) {
    const { target } = event;
    let mouseAt = event.clientX - (target as HTMLElement).getBoundingClientRect().left;
    mouseAt = Math.round(Math.abs(mouseAt));
    return mouseAt > size / 2;
  }

  mouseLeave() {
    const { value, halfStar, config } = this.state;
    if (!config.edit) return;
    if (config.half) {
      halfStar.hidden = !this.isDecimal(value);
      halfStar.at = Math.floor(this.state.value);
    }
    this.setState({
      stars: this.getStars(),
    });
  }

  clicked(event: MouseEvent<HTMLSpanElement>) {
    const { config, halfStar } = this.state;
    if (!config.edit) return;
    let index = Number(event.currentTarget.getAttribute('data-index'));
    let value;
    if (config.half) {
      const isAtHalf = this.moreThanHalf(event, config.size);
      halfStar.hidden = isAtHalf;
      if (isAtHalf) index = index + 1;
      value = isAtHalf ? index : index + 0.5;
      halfStar.at = index;
    } else {
      value = index = index + 1;
    }
    this.setState({
      value: value,
      stars: this.getStars(index),
    });
    this.props.onChange?.(value);
  }

  renderHalfStarStyleElement() {
    const { config, uniqueness } = this.state;
    return (
      <style
        dangerouslySetInnerHTML={{
          __html: getHalfStarStyles(config.color2, uniqueness),
        }}
      ></style>
    );
  }

  renderStars() {
    const { halfStar, stars, uniqueness, config } = this.state;
    const { color1, color2, size, char, half, edit } = config;
    return stars.map((star, i) => {
      let starClass = '';
      if (half && !halfStar.hidden && halfStar.at === i) {
        starClass = `react-stars-${uniqueness}`;
      }
      const style = Object.assign({}, defaultStyles, {
        color: star.active ? color2 : color1,
        cursor: edit ? 'pointer' : 'default',
        fontSize: `${size}px`,
      });
      return (
        <span
          className={starClass}
          style={style}
          key={i}
          data-index={i}
          data-forhalf={char}
          onMouseOver={this.mouseOver.bind(this)}
          onMouseMove={this.mouseOver.bind(this)}
          onMouseLeave={this.mouseLeave.bind(this)}
          onClick={this.clicked.bind(this)}
        >
          {char}
        </span>
      );
    });
  }

  render() {
    const { className } = this.props;

    return (
      <div className={className} style={parentStyles}>
        {this.state.config.half ? this.renderHalfStarStyleElement() : ''}
        {this.renderStars()}
      </div>
    );
  }
}

export default ReactStars;