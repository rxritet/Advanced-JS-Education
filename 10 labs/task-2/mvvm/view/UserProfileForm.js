export class UserProfileForm {
  constructor(containerId, viewModel) {
    this.container = document.getElementById(containerId);
    this.viewModel = viewModel;
  }

  render = () => {
    const vm = this.viewModel;

    this.container.innerHTML = `
      <div class="mvvm-form">
        <h1>User Profile MVVM</h1>

        <div class="form-group">
          <label>First Name</label>
          <input type="text" data-field="firstName" value="${vm.firstName}" />
          <span class="error">${vm.errors?.firstName ?? ''}</span>
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text" data-field="lastName" value="${vm.lastName}" />
          <span class="error">${vm.errors?.lastName ?? ''}</span>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" data-field="email" value="${vm.email}" />
          <span class="error">${vm.errors?.email ?? ''}</span>
        </div>

        <div class="form-group">
          <label>Age</label>
          <input type="number" data-field="age" value="${vm.age}" />
          <span class="error">${vm.errors?.age ?? ''}</span>
        </div>

        <div class="preview">
          <h3>Preview</h3>
          <p><strong>Full Name:</strong> ${vm.fullName}</p>
          <p><strong>Valid:</strong> ${vm.isValid ? 'Yes' : 'No'}</p>
        </div>

        <div class="actions">
          <button id="saveBtn" ${vm.isValid ? '' : 'disabled'}>Save</button>
          <button id="resetBtn">Reset</button>
        </div>

        <div id="message"></div>
      </div>
    `;

    this._attachEventListeners();
    this._subscribeToChanges();
  };

  _attachEventListeners() {
    this.container.addEventListener('input', e => {
      if (e.target.dataset.field) {
        this.viewModel[e.target.dataset.field] = e.target.value;
      }
    });

    document.getElementById('saveBtn')?.addEventListener('click', () => {
      const result = this.viewModel.save();
      const message = document.getElementById('message');
      if (result.success) {
        message.textContent = 'Profile saved successfully!';
        message.className = 'success';
      } else {
        message.textContent = 'Please fix the errors.';
        message.className = 'error';
      }
    });

    document.getElementById('resetBtn')?.addEventListener('click', () => {
      this.viewModel.reset();
    });
  }

  _subscribeToChanges() {
    ['firstName', 'lastName', 'email', 'age', 'errors'].forEach(field => {
      this.viewModel.watch(field, this.render);
    });
  }
}