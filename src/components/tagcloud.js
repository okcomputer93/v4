import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePrefersReducedMotion } from '@hooks';

// Modified from https://github.com/crazylxr/3d-tag-cloud-for-react

const R = 200;
const _focalLength = R * 1.5;
const BASEANGLE = Math.PI / 360;

const Tag = ({ x, y, z, name }) => {
  const scale = _focalLength / (_focalLength - z);
  const alpha = (z + R) / (2 * R);

  const tagStyle = {
    display: 'inline-block',
    position: 'absolute',
    height: '50px',
    lineHeight: '50px',
    fontSize: '20px',
  };

  const otherStyle = {
    left: `${x}px`,
    top: `${y}px`,
    fontSize: `${14 * scale}px`,
    opacity: alpha + 0.5,
    color: 'var(--green)',
    fontFamily: 'var(--font-mono)',
  };

  return <p style={{ ...tagStyle, ...otherStyle }}>{name}</p>;
};

Tag.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  z: PropTypes.number,
  name: PropTypes.string,
};

const TagCloud = ({ speed = 0.3, radius = 200, tagName }) => {
  const move = () => {
    const len = tagName.length;

    return tagName.map((tag, i) => {
      const angleA = Math.acos((2 * (i + 1) - 1) / len - 1);
      const angleB = angleA * Math.sqrt(len * Math.PI);

      const z = radius * Math.cos(angleA);
      const y = radius * Math.sin(angleA) * Math.sin(angleB);
      const x = radius * Math.sin(angleA) * Math.cos(angleB);

      const tagProps = {
        x,
        y,
        z,
        name: tag,
      };

      return tagProps;
    });
  };

  const [angleX, setAngleX] = useState(speed * BASEANGLE);
  const [angleY, setAngleY] = useState(speed * BASEANGLE);
  const [tags, setTags] = useState(move());
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerStyle = {
    width: '100%',
    heght: '100%',
  };

  const wrapperStyle = {
    position: 'relative',
    left: '40%',
    top: '200px',
  };

  const rotateX = () => {
    const cos = Math.cos(angleX);
    const sin = Math.sin(angleX);
    const newTags = tags.map(tag => {
      const y = tag.y * cos - tag.z * sin;
      const z = tag.z * cos + tag.y * sin;
      tag.y = y;
      tag.z = z;

      return tag;
    });

    setTags(newTags);
  };

  const rotateY = () => {
    const cos = Math.cos(angleY);
    const sin = Math.sin(angleY);

    const newTags = tags.map(tag => {
      const x = tag.x * cos - tag.z * sin;
      const z = tag.z * cos + tag.x * sin;
      tag.x = x;
      tag.z = z;

      return tag;
    });

    setTags(newTags);
  };

  useEffect(() => {
    document.addEventListener('mousemove', e => {
      const newAngleX =
        2 * (e.clientX / document.body.getBoundingClientRect().width - 0.5) * speed * BASEANGLE;
      const newAngleY =
        2 * (e.clientY / document.body.getBoundingClientRect().height - 0.5) * speed * BASEANGLE;

      setAngleX(newAngleX);
      setAngleY(newAngleY);
    });

    if (tagName.length === 0) {
      return;
    }

    if (prefersReducedMotion) {
      return;
    }

    const animation = () => {
      rotateX();
      rotateY();
      requestAnimationFrame(animation);
    };

    requestAnimationFrame(() => {
      animation();
    });

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="tag-cloud-container" style={containerStyle}>
      <div className="wrapper" style={wrapperStyle}>
        {tags.map((tag, index) => (
          <Tag key={index} {...tag} />
        ))}
      </div>
    </div>
  );
};

TagCloud.propTypes = {
  speed: PropTypes.number,
  radius: PropTypes.number,
  tagName: PropTypes.array,
};

export default TagCloud;
