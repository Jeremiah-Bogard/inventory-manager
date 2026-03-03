export default function Page({ title, children, action, actionText, headers, pageClass }) {
    return (
        <div className="page">
            <div className="page-header">
                <h1>{title}</h1>
                {action && action === "submit" && (
                    <button type="submit" className="bttn bttn-primary">{actionText}</button>
                )}
                {action && action !== "submit" && (
                    <button className="bttn bttn-primary" onClick={action}>{actionText}</button>
                )}
            </div>
            <div className="page-content">
                <div className={`page-grid-header ${pageClass}`}>
                    {headers.map((str, index) => (
                        <p key={index}>{str}</p>
                    ))}
                </div>
                <div className="page-grid">
                    {children}
                </div>
            </div>
        </div>
    )
}
