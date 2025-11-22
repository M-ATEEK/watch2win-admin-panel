import React, { Component } from "react";
import Pagination from "react-js-pagination";

class EPagination extends Component {
	state = {
		pageRangeDisplayed: 5,
		itemsCountPerPage: 10,
	};

	componentWillReceiveProps(nextProps) {
		if (nextProps.items.length === 0 && this.props.activePage > 1) {
			this.props.handlePageChange(this.props.activePage - 1, this.state.itemsCountPerPage);
		}
	}

	handlePageChange = (pageNumber) => {
		this.props.handlePageChange(pageNumber, this.state.itemsCountPerPage);
	};

	render() {
		return (
			<nav className='adminPagination'>
				<Pagination
					activePage={this.props.activePage}
					itemsCountPerPage={this.state.itemsCountPerPage}
					totalItemsCount={this.props.totalItemsCount}
					pageRangeDisplayed={this.state.pageRangeDisplayed}
					onChange={this.handlePageChange.bind(this)}
					innerClass='pagination'
					itemClass='page-item'
					linkClass='page-link'
					itemClassPrev='prev'
					itemClassNext='next'
					hideFirstLastPages={true}
					prevPageText='<'
					nextPageText='>'
				/>
			</nav>
		);
	}
}

export default EPagination;
