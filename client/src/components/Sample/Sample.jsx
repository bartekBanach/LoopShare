import { useRef, useState, useEffect, useCallback } from 'react';
import WaveSurfer from 'wavesurfer.js';

import formatDistance from 'date-fns/formatDistance';
import { Link } from 'react-router-dom';
import { FaUser, FaPlay, FaPause } from 'react-icons/fa6';
import { IoMdDownload } from 'react-icons/io';
import bytesToMb from '../../utilities/bytesToMb';
import styles from './Sample.module.css';

const useWavesurfer = (containerRef, options) => {
  const [wavesurfer, setWavesurfer] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return undefined;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [containerRef]);

  return wavesurfer;
};

function Sample({ sample }) {
  const formatDate = (date) => {
    const formatted = formatDistance(new Date(date), new Date());
    return formatted;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerMain}>
          <h3>{sample.name}</h3>
          <div className={styles.username}>
            <FaUser />
            <Link to={`/user/${sample.user_id}`}>{sample.username}</Link>
          </div>
        </div>

        <button tabIndex={-1} type="button" className={styles.downloadBtn} aria-label="download">
          <a href={sample.url} download aria-label="download">
            <IoMdDownload />
          </a>
        </button>
      </div>

      <div className={styles.content}>
        <p className={styles.uploadDate}>Uploaded: {formatDate(sample.createdAt)} ago</p>
        <Player sample={sample} />

        <div className={styles.info}>
          <div className={styles.infoItem}>{sample.category}</div>
          <div className={styles.infoItem}>{sample.type}</div>
          {sample.key && <div className={styles.infoItem}>{sample.key}</div>}
          {sample.bpm && <div className={styles.infoItem}>BPM {sample.bpm}</div>}
          {sample.size && <div className={styles.infoItem}>{bytesToMb(sample.size)}MB</div>}
        </div>
      </div>
    </div>
  );
}

function Player({ sample }) {
  const containerRef = useRef();

  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  const wavesurfer = useWavesurfer(containerRef, {
    url: sample.url,
    autoplay: false,
    height: 50,
    barWidth: 3,
    waveColor: 'blue',
    progressColor: 'red',
    responsive: true,
  });

  const onPlayClick = useCallback(
    () => (wavesurfer.isPlaying() ? wavesurfer.pause() : wavesurfer.play()),
    [wavesurfer]
  );

  const onInteraction = useCallback(() => {
    if (!loading) {
      wavesurfer.play();
    }
  }, [wavesurfer, loading]);

  useEffect(() => {
    if (!wavesurfer) return undefined;

    setIsPlaying(false);

    const subscriptions = [
      wavesurfer.on('play', () => setIsPlaying(true)),
      wavesurfer.on('pause', () => setIsPlaying(false)),
      wavesurfer.on('ready', () => setLoading(false)),
    ];

    return () => {
      subscriptions.forEach((unsub) => unsub());
    };
  }, [wavesurfer]);

  return (
    <div className={styles.player}>
      <button type="button" disabled={loading} onClick={onPlayClick} className={styles.playBtn}>
        {isPlaying ? <FaPause size="30px" /> : <FaPlay size="30px" />}
      </button>

      <div className={styles.waveformWrapper}>
        <div
          role="button"
          aria-label="play"
          onClick={onInteraction}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onInteraction();
            }
          }}
          tabIndex={0}
          className={`${styles.waveform} ${loading && styles.hidden}`}
          ref={containerRef}
        />
        {loading && (
          <div className={styles.placeholder}>
            <div className={styles.fill} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sample;
