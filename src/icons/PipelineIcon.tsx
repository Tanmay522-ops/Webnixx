const PipelineIcon = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            className={className}
        >
            <rect x="2" y="2" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="2" y="10" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <rect x="2" y="18" width="20" height="6" rx="2" stroke="currentColor" strokeWidth="1.5" />
            <line x1="12" y1="8" x2="12" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="16" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
    )
}

export default PipelineIcon