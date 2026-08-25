window.NX_SCREENS=window.NX_SCREENS||{};window.NX_SCREENS["signal"]=`<section class="screen" data-title="Signal Lab" id="signal">
<div class="screen-intro">
<div><div class="overline">SIGNAL LAB · SL-021</div><h1>De una alarma a una investigación reproducible.</h1><p>Este caso utiliza datos sintéticos y cálculos ejecutados en el navegador para demostrar cómo podría funcionar el motor analítico.</p></div>
<div class="signal-id-card"><span>Signal ID</span><strong>SL-021</strong><small>Turnover acceleration · Op. Norte</small></div>
</div>
<div class="methodology-banner"><span class="methodology-icon">∑</span><div><b>Demo analítica real dentro del mockup</b><p>Las correlaciones de esta pantalla se calculan desde series sintéticas de 18 meses. No son números dibujados manualmente.</p></div><button class="text-button term-trigger" data-term="correlation" type="button">Entender correlación →</button></div>
<div class="content-grid signal-detail-grid">
<article class="panel relation-panel">
<div class="panel-heading split"><div><div class="overline">MULTIVARIABLE EXPLORER</div><h2>Relación con rotación.</h2></div><span class="synthetic-label">Synthetic model</span></div>
<div class="correlation-list" id="correlationList"></div>
<div class="method-note"><b>Lectura correcta:</b> una asociación fuerte ayuda a priorizar investigación. No demuestra causalidad y debe revisarse con temporalidad, muestra, calidad del dato y variables de control.</div>
</article>
<aside class="panel lag-panel">
<div class="overline">LAG EXPLORER</div><h2>¿Qué variable se mueve antes?</h2>
<p>Comparamos horas extra contra rotación desplazando la serie en el tiempo.</p>
<div class="lag-cards" id="lagCards"></div>
<div class="best-lag" id="bestLag"><span>Mejor ajuste sintético</span><strong>+1 mes</strong><small>La señal de horas extra antecede la rotación.</small></div>
</aside>
</div>
<div class="content-grid evidence-layout">
<article class="panel">
<div class="panel-heading"><div><div class="overline">EVIDENCE LAYER</div><h2>Qué sabemos vs. qué estamos interpretando.</h2></div></div>
<div class="evidence-table">
<div class="evidence-item"><span class="evidence-type observed">Observed</span><div><b>Rotación voluntaria 11.2% → 18.2%</b><p>Medida directamente en el mismo scope organizacional.</p></div></div>
<div class="evidence-item"><span class="evidence-type derived">Derived</span><div><b>63% de las bajas se concentra en tenure 6–18 meses</b><p>Resultado derivado desde fechas de ingreso y salida.</p></div></div>
<div class="evidence-item"><span class="evidence-type observed">Observed</span><div><b>Horas extra comienzan a desviarse antes</b><p>La serie supera su baseline antes del incremento de rotación.</p></div></div>
<div class="evidence-item"><span class="evidence-type inferred">Inferred</span><div><b>La sobrecarga es una hipótesis prioritaria</b><p>Existe asociación, secuencia temporal y deterioro simultáneo de Workload.</p></div></div>
<div class="evidence-item"><span class="evidence-type unknown">Unknown</span><div><b>Percepción de compensación no disponible</b><p>Podría ser una explicación alternativa y actualmente no puede descartarse.</p></div></div>
</div>
</article>
<aside class="panel decision-panel">
<div class="overline">DECISION SUPPORT</div>
<div class="decision-icon">≠</div>
<h2>No culpar al supervisor todavía.</h2>
<p>Manager Support presenta una correlación cercana a cero en el dataset sintético y se mantiene estable durante el periodo.</p>
<div class="decision-stack"><div><span>A</span><b>Investigar primero</b><small>Capacidad y carga operacional.</small></div><div><span>B</span><b>Controlar</b><small>Tenure y onboarding.</small></div><div><span>?</span><b>Dato faltante</b><small>Compensación percibida.</small></div></div>
<button class="primary-button compact" data-jump="climate" type="button">Crear nueva evidencia →</button>
</aside>
</div>
</section>`;
