type GridControls = {
    onSelect: (size: number) => void
}

export const GridControls = ({ onSelect }: GridControls) => (
    <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: "5px"
    }}>
        {[1, 3, 5, 8, 10, 15, 20].map(size =>
            <button key={size} onClick={() => onSelect(size)}>
                {size}px
            </button>
        )}
    </div>
)