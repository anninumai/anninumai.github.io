type EvidenceProps = {
 src: string; full: string; alt: string; width: number; height: number;
 no: string; children: React.ReactNode; className?: string;
};
export function Evidence({src,full,alt,width,height,no,children,className=''}:EvidenceProps) {
 return <figure className={`source-evidence ${className}`}><a className="source-image-link" href={full} target="_blank" rel="noreferrer" aria-label={`${alt}。資料全体を別タブで拡大表示`}><img src={src} alt={alt} width={width} height={height} loading="lazy"/><span className="source-expand">資料全体を拡大 <span aria-hidden="true">↗</span></span></a><figcaption><span className="figure-no">FIG. {no}</span><span>{children}</span></figcaption></figure>;
}
