// performance-test.js - Compare delegation vs individual listeners

function testIndividualListeners(containerId, itemCount) {
  const container = document.getElementById(containerId);
  const startTime = performance.now();

  // Attach listener to EACH element
  for (let i = 1; i <= itemCount; i++) {
    const item = container.querySelector(`[data-id="todo-${i}"]`);
    if (item) {
      const checkbox = item.querySelector('input[type="checkbox"]');
      if (!checkbox) continue;

      checkbox.addEventListener("change", () => {
        item.classList.toggle("completed", checkbox.checked);
      });
    }
  }

  const endTime = performance.now();
  return endTime - startTime;
}

function testEventDelegation(containerId) {
  const container = document.getElementById(containerId);
  const startTime = performance.now();

  // Single listener on parent
  container.addEventListener("change", (e) => {
    if (e.target.type === "checkbox") {
      const item = e.target.closest(".todo-item");
      if (item) {
        item.classList.toggle("completed", e.target.checked);
      }
    }
  });

  const endTime = performance.now();
  return endTime - startTime;
}

// Пример запуска в браузере, когда DOM и список уже созданы
export function runPerformanceTest() {
  const itemCount = 1000;

  console.log(
    "Individual listeners (1000 items):",
    testIndividualListeners("todo-list", itemCount),
    "ms"
  );
  console.log(
    "Event delegation:",
    testEventDelegation("todo-list"),
    "ms"
  );
}
